import { Injectable, Res } from '@nestjs/common';
import { PdfBase } from '../../base/pdf-base.class';
import { DateHelper } from '../../../shared/classes/date-helper';
import { EventEntity } from '../../../database/entities/event.entity';
import { OrganizationEntity } from '../../../database/entities/organization.entity';
import { EventShiftEntity } from '../../../database/entities/event-shift.entity';
import { OrganizationMemberEntity } from '../../../database/entities/organization-member.entity';
import { EventReportPdfRowItem } from '../event-report-pdf/classes/event-report-pdf-row-item';
import { EventStaffPoolEntity } from '../../../database/entities/event-staff-pool.entity';

const PDFDocument = require('pdfkit-table');
const fs = require('fs');

@Injectable()
export class EventOrganizationReportPdfService extends PdfBase {
  constructor(private dateHelper: DateHelper) {
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
      type Row = Record<string, EventReportPdfRowItem>;
      const row: Row = {};

      row['staff'] = this.getRowItem(member.firstName + ' ' + member.lastName);

      eventList.forEach((event) => {
        const rowItem = this.getRowItem('');
        const memberShifts = this.getMemberShift(event.id, member.id, shiftList);

        if (memberShifts != undefined) {
          this.setRowItemColor('#FFA200', 0.75, rowItem);
          rowItem.label = memberShifts.category.abbreviation;
        } else {
          const pool = this.getStaffPoolEntry(event.id, member.id, staffPool);

          if (pool != undefined) {
            this.setRowItemColor('#4DFF00', 0.5, rowItem);
          } else {
            this.setRowItemColor('#000000', 0.5, rowItem);
          }
        }

        row['event' + event.id] = rowItem;
      });

      table.datas.push(row);
    });
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

  private getRowItem(label: string): EventReportPdfRowItem {
    const rowItem = new EventReportPdfRowItem();
    rowItem.label = ' ' + label;
    rowItem.options.fontSize = 10;

    return rowItem;
  }

  private setRowItemColor(color: string, opacity: number, item: EventReportPdfRowItem) {
    item.options.backgroundOpacity = opacity;
    item.options.backgroundColor = color;
  }

  private addTableHeader(table: any, eventList: EventEntity[]) {
    table.headers.push({
      label: '',
      property: 'staff',
      align: 'left',
      width: 150,
    });

    eventList.forEach((event) => {
      const headerString =
        this.dateHelper.getDayMonthString(event.start) +
        '\n' +
        this.dateHelper.getTimeString(event.start) +
        '\n' +
        event.category.abbreviation;

      const propertyString = 'event' + event.id;
      table.headers.push({
        label: headerString,
        property: propertyString,
        align: 'center',
        width: 40,
      });
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
