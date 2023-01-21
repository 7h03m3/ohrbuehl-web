import { Injectable, Res } from '@nestjs/common';
import { EventEntity } from '../../../database/entities/event.entity';
import { DateHelper } from '../../../shared/classes/date-helper';
import { PdfBase } from '../../base/pdf-base.class';
import { PdfTableRowItem } from '../../base/classes/pdf-table-row-item';

const PDFDocument = require('pdfkit-table');
const fs = require('fs');

type Row = Record<string, PdfTableRowItem>;

@Injectable()
export class EventReportPdfService extends PdfBase {
  constructor(private dateHelper: DateHelper) {
    super();
  }

  async generatePdf(eventData: EventEntity, @Res() response) {
    const tempFilename: string = './' + this.getRandomFilename() + '.pdf';
    const filename = this.getFilename(eventData.title, eventData.start);

    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    const fileStream = fs.createWriteStream(tempFilename);
    await doc.pipe(fileStream);

    const title =
      eventData.title +
      ' ' +
      this.dateHelper.getDateString(eventData.start) +
      ' ' +
      this.dateHelper.getTimeString(eventData.start) +
      ' - ' +
      this.dateHelper.getTimeString(eventData.end);

    const table = this.createTable(title, 18);
    table.headers.push(this.getTableHeaderItem(' Schicht', 'category', 'left', 200));
    table.headers.push(this.getTableHeaderItem(' Zeit', 'time', 'left', 100));
    table.headers.push(this.getTableHeaderItem(' Verein', 'organization', 'left', 100));
    table.headers.push(this.getTableHeaderItem(' Person', 'staff', 'left', 150));

    let currentCategory = 0;
    let currentCount = 1;
    eventData.shifts.forEach((shift) => {
      const row: Row = {};

      if (shift.assignedStaff != undefined) {
        row['staff'] = this.getTableRowItem(shift.assignedStaff.firstName + ' ' + shift.assignedStaff.lastName, 12);
      } else {
        row['staff'] = this.getTableRowItem('');
      }

      if (shift.organization != undefined) {
        row['organization'] = this.getTableRowItem(shift.organization.abbreviation, 12);
        this.setTableRowItemColor(shift.organization.color, 1, row['organization']);
      } else {
        row['organization'] = this.getTableRowItem('');
      }

      row['time'] = this.getTableRowItem(this.dateHelper.getStartEndTimeString(shift.start, shift.end), 12);

      if (currentCategory != shift.categoryId) {
        currentCategory = shift.categoryId;
        currentCount = 1;
      } else {
        currentCount = currentCount + 1;
      }

      row['category'] = this.getTableRowItem(shift.category.name + ' ' + currentCount, 12);

      table.datas.push(row);
    });

    await doc.table(table, {
      prepareHeader: () => doc.font('Helvetica-Bold').fontSize(14),
    });

    this.finishDocument(doc, fileStream, tempFilename, filename, response);
  }

  private getFilename(title: string, date: number): string {
    let filename = title.toLowerCase().replace(/[^a-z0-9\u00fc\u00e4\u00f6\-]/gi, '_');
    filename += '_' + this.dateHelper.getDateFileName(date) + '_schichten.pdf';
    return filename;
  }
}
