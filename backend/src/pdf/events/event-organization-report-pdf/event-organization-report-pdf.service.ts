import { Injectable, Res } from '@nestjs/common';
import { PdfBase } from '../../base/pdf-base.class';
import { DateHelper } from '../../../shared/classes/date-helper';
import { EventEntity } from '../../../database/entities/event.entity';
import { OrganizationEntity } from '../../../database/entities/organization.entity';
import { EventShiftEntity } from '../../../database/entities/event-shift.entity';
import { OrganizationMemberEntity } from '../../../database/entities/organization-member.entity';

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
        label: 'Test !!',
        fontSize: 18,
      },
      subtitle: '',
      headers: [{ label: 'Funktionär', align: 'left', width: 150 }],
      rows: [],
      divider: {
        header: { disabled: false, width: 1, opacity: 1 },
        horizontal: { disabled: false, width: 1, opacity: 1 },
        vertical: { disabled: false, width: 1, opacity: 1 },
        padding: 5,
        columnSpacing: 10,
      },
    };

    for (let i = 0; i < 5; i++) {
      eventList.forEach((event) => {
        const headerString =
          this.dateHelper.getDayMonthString(event.start) +
          '\n' +
          this.dateHelper.getTimeString(event.start) +
          '\n' +
          event.category.abbreviation;
        table.headers.push({ label: headerString, align: 'center', width: 40 });
      });
    }

    eventList.forEach((event) => {
      event.shifts.forEach((shift) => {
        if (shift.assignedStaff != undefined) {
          table.rows.push([shift.assignedStaff.firstName + ' ' + shift.assignedStaff.lastName]);
        }
      });
    });

    await doc.table(table, {
      prepareHeader: () => {
        doc.font('Helvetica');
        doc.fontSize(8);
        doc.lineWidth(0.5);
        doc.stroke();
      },
    });

    this.finishDocument(doc, fileStream, tempFilename, filename, response);
  }

  private getFilename(title: string, year: string): string {
    let filename = title.toLowerCase().replace(/[^a-z0-9\u00fc\u00e4\u00f6\-]/gi, '_');
    filename += '_' + year + '_schichten.pdf';
    return filename;
  }

  private getOrganizationName(eventList: EventEntity[]) {
    let organizationName = 'nobody';

    if (eventList.length != 0 && eventList[0].shifts.length != 0 && eventList[0].shifts[0].organization) {
      organizationName = eventList[0].shifts[0].organization.abbreviation;
    }

    return organizationName;
  }

  private getFullYear(eventList: EventEntity[]): string {
    let date = new Date().getTime();

    if (eventList.length != 0) {
      date = eventList[0].start;
    }

    return this.dateHelper.getFullYear(date);
  }
}
