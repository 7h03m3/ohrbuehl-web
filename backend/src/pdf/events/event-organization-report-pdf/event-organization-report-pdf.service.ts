import { Injectable, Res } from '@nestjs/common';
import { PdfBase } from '../../base/pdf-base.class';
import { DateHelper } from '../../../shared/classes/date-helper';
import { EventEntity } from '../../../database/entities/event.entity';
import { OrganizationEntity } from '../../../database/entities/organization.entity';
import { EventShiftEntity } from '../../../database/entities/event-shift.entity';
import { OrganizationMemberEntity } from '../../../database/entities/organization-member.entity';
import { PdfTableRowItem } from './classes/pdf-table-row-item';
import { EventStaffPoolEntity } from '../../../database/entities/event-staff-pool.entity';
import { PdfTableHeaderItem } from './classes/pdf-table-header-item';
import { EventShiftCategoryEntity } from '../../../database/entities/event-shift-category.entity';
import { SortHelper } from '../../../shared/classes/sort-helper';

const PDFDocument = require('pdfkit-table');
const fs = require('fs');

type Row = Record<string, PdfTableRowItem>;

@Injectable()
export class EventOrganizationReportPdfService extends PdfBase {
  private colorNotAvailable = '#000000';
  private colorAvailable = '#4DFF00';
  private colorShiftSet = '#FFA200';

  constructor(private dateHelper: DateHelper, private sortHelper: SortHelper) {
    super();
  }

  async generatePdf(
    organization: OrganizationEntity,
    memberList: OrganizationMemberEntity[],
    eventList: EventEntity[],
    shiftList: EventShiftEntity[],
    staffPool: EventStaffPoolEntity[],
    @Res() response,
  ) {
    const tempFilename: string = './' + this.getRandomFilename() + '.pdf';
    const organizationName = organization.abbreviation;
    const fullYear = this.getFullYear(eventList);
    const filename = this.getFilename(organizationName, fullYear);

    const doc = new PDFDocument({ margin: 30, size: 'A4', layout: 'landscape' });
    const fileStream = fs.createWriteStream(tempFilename);
    await doc.pipe(fileStream);

    const table = {
      title: {
        label: organization.abbreviation + ' ' + fullYear,
        fontSize: 18,
      },
      subtitle: '',
      headers: [],
      datas: [],
    };

    this.addTableHeader(table, eventList);

    this.addTableRows(table, memberList, eventList, shiftList, staffPool);

    await doc.table(table, {
      prepareHeader: () => {
        doc.font('Helvetica').fontSize(8);
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

      row['staff'] = this.getRowItem(member.firstName + ' ' + member.lastName);

      eventList.forEach((event) => {
        const rowItem = this.getRowItem('');
        const memberShifts = this.getMemberShift(event.id, member.id, shiftList);

        if (memberShifts != undefined) {
          this.setRowItemColor(this.colorShiftSet, 0.75, rowItem);
          rowItem.label = memberShifts.category.abbreviation;
        } else {
          const pool = this.getStaffPoolEntry(event.id, member.id, staffPool);

          if (pool != undefined) {
            this.setRowItemColor(this.colorAvailable, 0.5, rowItem);
          } else {
            this.setRowItemColor(this.colorNotAvailable, 0.5, rowItem);
          }
        }

        row['event' + event.id] = rowItem;
      });

      table.datas.push(row);
    });
  }

  private async addLegendTable(shiftList: EventShiftEntity[], doc: any) {
    const table = {
      title: {
        label: 'Legende',
        fontSize: 14,
      },
      subtitle: '',
      headers: [],
      datas: [],
    };

    table.headers.push(this.getHeaderItem('', 'item', 'center', 40));
    table.headers.push(this.getHeaderItem(' Beschreibung', 'description', 'left', 120));

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
    const itemShiftSet = this.getRowItem(itemText);
    this.setRowItemColor(color, opacity, itemShiftSet);
    row['item'] = itemShiftSet;
    row['description'] = this.getRowItem(description);
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

  private getRowItem(label: string): PdfTableRowItem {
    const rowItem = new PdfTableRowItem();
    rowItem.label = ' ' + label;
    rowItem.options.fontSize = 10;

    return rowItem;
  }

  private getHeaderItem(label: string, property: string, align: string, width: number) {
    const item = new PdfTableHeaderItem();
    item.label = label;
    item.property = property;
    item.align = align;
    item.width = width;
    return item;
  }

  private setRowItemColor(color: string, opacity: number, item: PdfTableRowItem) {
    item.options.backgroundOpacity = opacity;
    item.options.backgroundColor = color;
  }

  private addTableHeader(table: any, eventList: EventEntity[]) {
    table.headers.push(this.getHeaderItem('', 'staff', 'left', 150));

    eventList.forEach((event) => {
      const headerString =
        this.dateHelper.getDayMonthString(event.start) +
        '\n' +
        this.dateHelper.getTimeString(event.start) +
        '\n' +
        event.category.abbreviation;

      const propertyString = 'event' + event.id;
      table.headers.push(this.getHeaderItem(headerString, propertyString, 'center', 40));
    });
  }

  private getFilename(title: string, year: string): string {
    let filename = title.toLowerCase().replace(/[^a-z0-9\u00fc\u00e4\u00f6\-]/gi, '_');
    filename += '_' + year + '_schichten.pdf';
    return filename;
  }

  private getFullYear(eventList: EventEntity[]): string {
    let date = new Date().getTime();

    if (eventList.length != 0) {
      date = eventList[0].start;
    }

    return this.dateHelper.getFullYear(date);
  }
}
