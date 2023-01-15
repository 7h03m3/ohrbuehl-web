import { Injectable, Res } from '@nestjs/common';
import { EventEntity } from '../../../database/entities/event.entity';
import { createReadStream, unlink } from 'fs';
import { DateHelper } from '../../../shared/classes/date-helper';
import { EventReportPdfItem } from './classes/event-report-pdf-item';
import { FileHelper } from '../../../shared/classes/file-helper';

const PDFDocument = require('pdfkit-table');
const fs = require('fs');

@Injectable()
export class EventReportPdfService {
  constructor(private dateHelper: DateHelper, private fileHelper: FileHelper) {}

  async generatePdf(eventData: EventEntity, @Res() response) {
    const tempFilename: string = './' + this.fileHelper.getRandomFilename() + '.pdf';
    const filename = this.getFilename(eventData.title, eventData.start);

    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    const fileStream = fs.createWriteStream(tempFilename);
    await doc.pipe(fileStream);

    const title =
      eventData.title +
      ' (' +
      eventData.category.abbreviation +
      ') ' +
      this.dateHelper.getDateString(eventData.start) +
      ' ' +
      this.dateHelper.getTimeString(eventData.start) +
      ' ' +
      this.dateHelper.getTimeString(eventData.end);

    const table = {
      title: {
        label: title,
        fontSize: 18,
      },
      subtitle: '',
      headers: [
        { label: ' Schicht', property: 'category', width: 200, fontSize: 16 },
        { label: ' Zeit', property: 'time', width: 100 },
        { label: ' Verein', property: 'organization', width: 100 },
        { label: ' Person', property: 'staff', width: 150 },
      ],
      datas: [],
    };

    eventData.shifts.forEach((shift) => {
      const entry = new EventReportPdfItem();
      entry.loadFromEntity(shift, this.dateHelper);

      table.datas.push(entry);
    });

    await doc.table(table, {
      prepareHeader: () => doc.font('Helvetica-Bold').fontSize(14),
    });

    doc.end();

    fileStream.on('finish', () => {
      const fileStream = createReadStream(tempFilename);
      response.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=' + filename,
        'Access-Control-Expose-Headers': 'Content-Disposition',
      });

      fileStream.pipe(response).on('close', () => {
        unlink(tempFilename, () => {});
      });
    });
  }

  private getFilename(title: string, date: number): string {
    let filename = title.toLowerCase().replace(/[^a-z0-9\u00fc\u00e4\u00f6\-]/gi, '_');
    filename += '_' + this.dateHelper.getDateFileName(date) + '_schichten.pdf';
    return filename;
  }
}
