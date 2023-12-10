import { Injectable, Res } from '@nestjs/common';
import { PdfBase } from '../base/pdf-base.class';
import { BusinessHourEntity } from '../../database/entities/business-hour.entity';
import { DateHelper } from '../../shared/classes/date-helper';
import { BusinessHourReservationEntity } from '../../database/entities/business-hour-reservation.entity';
import { PdfTableRowItem } from '../base/classes/pdf-table-row-item';
import { StringHelper } from '../../shared/classes/string-helper';
import { SummarizeHelper } from '../../shared/classes/summarize-helper';

const PDFDocument = require('pdfkit-table');

const fs = require('fs');
type Row = Record<string, PdfTableRowItem>;

@Injectable()
export class BusinessHourDayPdfService extends PdfBase {
  public async generatePdf(businessHour: BusinessHourEntity, @Res() response: any) {
    const tempFilename: string = './' + this.getRandomFilename() + '.pdf';
    const dateFileString =
      DateHelper.getDateFileName(businessHour.start) + '_' + DateHelper.getTimeFileName(businessHour.start);
    const filename = 'Reservationen_' + dateFileString + '.pdf';
    const title = 'Reservationen von ' + DateHelper.getStartEndDateString(businessHour.start, businessHour.end);
    const currentDateString = DateHelper.getDateTimeString(Date.now());

    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    const fileStream = fs.createWriteStream(tempFilename);
    await doc.pipe(fileStream);

    this.addText(title, 18, true, doc);
    this.addText('Stand: ' + currentDateString, 10, false, doc);
    this.addNewLine(doc);

    const summarizedData = SummarizeHelper.summarizeBusinessHoursReservation(businessHour.reservations);

    const summaryTable = this.createTable('', 18);
    this.addSummaryTableHeader(summaryTable);
    summarizedData.forEach((current) => {
      this.addSummaryTableRow(current, summaryTable);
    });
    await this.addTableToDocument(summaryTable, doc);

    this.addNewLine(doc);

    const table = this.createTable('Reservationen', 14);
    this.addTableHeader(table);
    businessHour.reservations.forEach((current) => {
      this.addTableRow(current, table);
    });

    await this.addTableToDocument(table, doc);
    this.finishDocument(doc, fileStream, tempFilename, filename, response);
  }

  private addSummaryTableHeader(table: any) {
    table.headers.push(this.getTableHeaderItem(' Distanz', 'distance', 'left', 430));
    table.headers.push(this.getTableHeaderItem(' Anzahl', 'count', 'left', 100));
  }

  private addTableHeader(table: any) {
    table.headers.push(this.getTableHeaderItem(' Distanz', 'distance', 'left', 120));
    table.headers.push(this.getTableHeaderItem(' Anzahl', 'count', 'left', 40));
    table.headers.push(this.getTableHeaderItem(' Verein / Person', 'organization', 'left', 150));
    table.headers.push(this.getTableHeaderItem(' Typ', 'type', 'left', 220));
  }

  private addSummaryTableRow(entry: BusinessHourReservationEntity, table: any) {
    const row: Row = {};

    row['distance'] = this.getTableRowItem(StringHelper.getReservationFacilityTypeString(entry.facilityType));
    row['count'] = this.getTableRowItem('' + entry.count);

    table.datas.push(row);
  }

  private addTableRow(entry: BusinessHourReservationEntity, table: any) {
    const row: Row = {};

    row['distance'] = this.getTableRowItem(StringHelper.getReservationFacilityTypeString(entry.facilityType));
    row['count'] = this.getTableRowItem('' + entry.count);

    if (entry.organization == null) {
      row['organization'] = this.getTableRowItem(entry.owner.firstName + ' ' + entry.owner.lastName);
    } else {
      row['organization'] = this.getTableRowItem(entry.organization.abbreviation);
    }

    let typeString = StringHelper.getEventTypeString(entry.eventType);
    if (entry.comment.length != 0) {
      typeString += ' (' + entry.comment + ')';
    }
    row['type'] = this.getTableRowItem(typeString);
    table.datas.push(row);
  }

  private async addTableToDocument(table: any, doc: any) {
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
  }
}
