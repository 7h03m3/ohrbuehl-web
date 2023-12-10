import { Injectable, Res } from '@nestjs/common';
import { PdfBase } from '../../base/pdf-base.class';
import { EventEntity } from '../../../database/entities/event.entity';
import { OrganizationEntity } from '../../../database/entities/organization.entity';
import { EventShiftEntity } from '../../../database/entities/event-shift.entity';
import { OrganizationMemberEntity } from '../../../database/entities/organization-member.entity';
import { PdfTableRowItem } from '../../base/classes/pdf-table-row-item';
import { EventStaffPoolEntity } from '../../../database/entities/event-staff-pool.entity';
import { EventShiftCategoryEntity } from '../../../database/entities/event-shift-category.entity';
import { SortHelper } from '../../../shared/classes/sort-helper';
import { EventCategoryEntity } from '../../../database/entities/event-category.entity';
import { DateHelper } from '../../../shared/classes/date-helper';

const PDFDocument = require('pdfkit-table');
const fs = require('fs');

type Row = Record<string, PdfTableRowItem>;

@Injectable()
export class EventOrganizationReportPdfService extends PdfBase {
  private colorNotAvailable = '#000000';
  private colorAvailable = '#4DFF00';
  private colorShiftSet = '#FFA200';

  constructor(private sortHelper: SortHelper) {
    super();
  }

  async generatePdf(
    organization: OrganizationEntity,
    memberList: OrganizationMemberEntity[],
    eventList: EventEntity[],
    shiftList: EventShiftEntity[],
    staffPool: EventStaffPoolEntity[],
    category: EventCategoryEntity | undefined,
    @Res() response: any,
  ) {
    const tempFilename: string = './' + this.getRandomFilename() + '.pdf';
    const fullYear = this.getFullYear(eventList);

    let title = organization.abbreviation;
    if (category != undefined) {
      title = title + ' ' + category.name;
    }

    title = title + ' ' + fullYear;

    const filename = this.getFilename(title);

    const doc = new PDFDocument({ margin: 30, size: 'A4', layout: 'landscape' });
    const fileStream = fs.createWriteStream(tempFilename);
    await doc.pipe(fileStream);

    const table = this.createTable(title, 18);
    this.addTableHeader(table, eventList);
    this.addTableRows(table, memberList, eventList, shiftList, staffPool);

    await doc.table(table, {
      prepareHeader: () => {
        doc.font('Helvetica-Bold').fontSize(8);
      },
      columnSpacing: 5,
      divider: {
        horizontal: {
          disabled: false,
          opacity: 1,
        },
      },
    });

    doc.addPage();
    await this.addLegendTable(shiftList, doc);

    this.finishDocument(doc, fileStream, tempFilename, filename, response);
  }

  private addTableRows(
    table: any,
    memberList: OrganizationMemberEntity[],
    eventList: EventEntity[],
    shiftList: EventShiftEntity[],
    staffPool: EventStaffPoolEntity[],
  ) {
    memberList.forEach((member) => {
      const row: Row = {};

      row['staff'] = this.getTableRowItem(member.firstName + ' ' + member.lastName);

      eventList.forEach((event) => {
        const rowItem = this.getTableRowItem('');
        const memberShifts = this.getMemberShift(event.id, member.id, shiftList);

        if (memberShifts != undefined) {
          this.setTableRowItemColor(this.colorShiftSet, 0.75, rowItem);
          rowItem.label = memberShifts.category.abbreviation;
        } else {
          const pool = this.getStaffPoolEntry(event.id, member.id, staffPool);

          if (pool != undefined) {
            this.setTableRowItemColor(this.colorAvailable, 0.5, rowItem);
          } else {
            this.setTableRowItemColor(this.colorNotAvailable, 0.5, rowItem);
          }
        }

        row['event' + event.id] = rowItem;
      });

      table.datas.push(row);
    });
  }

  private async addLegendTable(shiftList: EventShiftEntity[], doc: any) {
    const table = this.createTable('Legende', 14);

    table.headers.push(this.getTableHeaderItem('', 'item', 'center', 40));
    table.headers.push(this.getTableHeaderItem(' Beschreibung', 'description', 'left', 120));

    this.addLegendRow('', 'Nicht verfügbar', this.colorNotAvailable, 0.5, table);
    this.addLegendRow('', 'Verfügbar', this.colorAvailable, 0.5, table);
    this.addLegendRow('', 'Eingeteilt', this.colorShiftSet, 0.75, table);

    const categoryMap = new Map<number, EventShiftCategoryEntity>();
    shiftList.forEach((shift) => {
      categoryMap.set(shift.category.id, shift.category);
    });

    const categoryArray = Array.from(categoryMap.values());
    this.sortHelper.sortShiftCategoryByAbbreviation(categoryArray);

    categoryArray.forEach((category) => {
      this.addLegendRow(category.abbreviation, category.name, '', 0, table);
    });

    await doc.table(table);
  }

  private addLegendRow(itemText: string, description: string, color: string, opacity: number, table: any) {
    const row: Row = {};
    const itemShiftSet = this.getTableRowItem(itemText);
    this.setTableRowItemColor(color, opacity, itemShiftSet);
    row['item'] = itemShiftSet;
    row['description'] = this.getTableRowItem(description);
    table.datas.push(row);
  }

  private getMemberShift(
    eventId: number,
    memberId: number,
    shiftList: EventShiftEntity[],
  ): EventShiftEntity | undefined {
    return shiftList.find((value) => {
      return value.eventId == eventId && value.assignedStaffId == memberId;
    });
  }

  private getStaffPoolEntry(
    eventId: number,
    memberId: number,
    staffPool: EventStaffPoolEntity[],
  ): EventStaffPoolEntity | undefined {
    return staffPool.find((value) => {
      return value.eventId == eventId && value.memberId == memberId;
    });
  }

  private addTableHeader(table: any, eventList: EventEntity[]) {
    table.headers.push(this.getTableHeaderItem('', 'staff', 'left', 150));

    eventList.forEach((event) => {
      const headerString =
        DateHelper.getDayMonthString(event.start) +
        '\n' +
        DateHelper.getTimeString(event.start) +
        '\n' +
        event.category.abbreviation;

      const propertyString = 'event' + event.id;
      table.headers.push(this.getTableHeaderItem(headerString, propertyString, 'center', 40));
    });
  }

  private getFilename(title: string): string {
    let filename = title.toLowerCase().replace(/[^a-z0-9\u00fc\u00e4\u00f6\-]/gi, '_');
    filename += '_schichten.pdf';
    return filename;
  }

  private getFullYear(eventList: EventEntity[]): string {
    let date = new Date().getTime();

    if (eventList.length != 0) {
      date = eventList[0].start;
    }

    return DateHelper.getFullYear(date);
  }
}
