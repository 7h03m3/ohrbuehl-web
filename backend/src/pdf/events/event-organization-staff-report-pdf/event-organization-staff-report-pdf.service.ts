import { Injectable, Res } from '@nestjs/common';
import { OrganizationMemberEntity } from '../../../database/entities/organization-member.entity';
import { PdfBase } from '../../base/pdf-base.class';
import { PdfTableRowItem } from '../../base/classes/pdf-table-row-item';
import { OrganizationEntity } from '../../../database/entities/organization.entity';
import { EventShiftEntity } from '../../../database/entities/event-shift.entity';
import { DateHelper } from '../../../shared/classes/date-helper';

const PDFDocument = require('pdfkit-table');
const fs = require('fs');

type Row = Record<string, PdfTableRowItem>;

@Injectable()
export class EventOrganizationStaffReportPdfService extends PdfBase {
  constructor() {
    super();
  }

  async generatePdf(organization: OrganizationEntity, staffList: OrganizationMemberEntity[], @Res() response) {
    const tempFilename: string = './' + this.getRandomFilename() + '.pdf';
    const fullYearString: string = this.getFullYear(staffList);
    const filename: string = this.getFilename(
      'Mitgliederschichtenliste ' + organization.abbreviation + ' ' + fullYearString,
    );

    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    const fileStream = fs.createWriteStream(tempFilename);
    await doc.pipe(fileStream);

    let firstPage = true;
    for (const staff of staffList) {
      if (staff.eventShifts.length != 0) {
        if (firstPage) {
          firstPage = false;
        } else {
          doc.addPage();
        }
        const table = this.createTable(staff.firstName + ' ' + staff.lastName, 14, 'Stand: ' + this.getCurrentDate());
        table.headers.push(this.getTableHeaderItem(' Zeit', 'date', 'left', 150));
        table.headers.push(this.getTableHeaderItem(' Tag', 'day', 'left', 60));
        table.headers.push(this.getTableHeaderItem(' Art', 'category', 'left', 150));

        for (const shift of staff.eventShifts) {
          const row: Row = {};
          row['date'] = this.getTableRowItem(DateHelper.getStartEndDateString(shift.start, shift.end));
          row['day'] = this.getTableRowItem(DateHelper.getDayOfWeekLong(shift.start));
          row['category'] = this.getTableRowItem(shift.category.name + ' (' + shift.category.abbreviation + ')');
          table.datas.push(row);
        }
        await doc.table(table);
      }
    }

    this.finishDocument(doc, fileStream, tempFilename, filename, response);
  }

  private getFilename(title: string): string {
    let filename = title.toLowerCase().replace(/[^a-z0-9\u00fc\u00e4\u00f6\-]/gi, '_');
    filename += '.pdf';
    return filename;
  }

  private getFullYear(staffList: OrganizationMemberEntity[]): string {
    const firstShift = this.getFirstShift(staffList);
    const date = firstShift != undefined ? firstShift.start : new Date().getTime();

    return DateHelper.getFullYear(date);
  }

  private getFirstShift(staffList: OrganizationMemberEntity[]): EventShiftEntity | undefined {
    for (const staff of staffList) {
      for (const shift of staff.eventShifts) {
        return shift;
      }
    }
    return undefined;
  }
}
