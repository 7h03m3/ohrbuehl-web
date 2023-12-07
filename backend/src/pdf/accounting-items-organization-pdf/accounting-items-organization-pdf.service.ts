import { Injectable, Res } from '@nestjs/common';
import { PdfBase } from '../base/pdf-base.class';
import { ShootingRangeAccountingUnitEntity } from '../../database/entities/shooting-range-accounting-unit.entity';
import { PdfTableRowItem } from '../base/classes/pdf-table-row-item';
import { DateHelper } from '../../shared/classes/date-helper';
import { SummarizeHelper } from '../../shared/classes/summarize-helper';

const PDFDocument = require('pdfkit-table');

const fs = require('fs');
type Row = Record<string, PdfTableRowItem>;

@Injectable()
export class AccountingItemsOrganizationPdfService extends PdfBase {
  constructor() {
    super();
  }

  async generatePdf(year: number, accountingUnitData: ShootingRangeAccountingUnitEntity[], @Res() response) {
    const firstEntry = accountingUnitData[0];
    const tempFilename: string = './' + this.getRandomFilename() + '.pdf';
    const filename = 'Schusszahlen_' + firstEntry.organization.abbreviation + '_' + year + '.pdf';
    const title = 'Schusszahlen ' + firstEntry.organization.name + ' ' + year;

    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    const fileStream = fs.createWriteStream(tempFilename);
    await doc.pipe(fileStream);

    const totalData = SummarizeHelper.summarizeShootingRangeAccounting(accountingUnitData);
    let table = this.createTable(title, 18);
    this.addTableHeader(table);
    for (const current of totalData) {
      this.addTableRow(current, table);
    }
    await this.addTableToDocument(table, doc);

    const summarizedDays = SummarizeHelper.summarizeShootingRangeDaysAccounting(accountingUnitData);

    summarizedDays.sort((a, b) => {
      if (a.price.name > b.price.name) {
        return 1;
      }

      if (a.price.name < b.price.name) {
        return -1;
      }

      return 0;
    });

    table = null;
    let priceId = 0;
    for (const current of summarizedDays) {
      if (priceId != current.price.id || table == null) {
        if (table != null) {
          await this.addTableToDocument(table, doc);
        }
        table = this.createTable(current.price.name, 12);
        this.addTableHeader(table);
        priceId = current.price.id;
      }
      this.addTableRow(current, table);
    }

    await this.addTableToDocument(table, doc);
    this.finishDocument(doc, fileStream, tempFilename, filename, response);
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

  private addTableHeader(table: any) {
    table.headers.push(this.getTableHeaderItem(' Datum', 'date', 'left', 150));
    table.headers.push(this.getTableHeaderItem(' Preis', 'price', 'left', 150));
    table.headers.push(this.getTableHeaderItem(' Schüsse', 'count', 'left', 150));
  }

  private addTableRow(entry: ShootingRangeAccountingUnitEntity, table: any) {
    const row: Row = {};

    const accounting = entry.accountingEntry;

    let priceText = entry.price.name;
    if (entry.comment.length != 0) {
      priceText += ' (' + entry.comment + ')';
    }

    row['date'] = this.getTableRowItem(DateHelper.getStartEndDateString(accounting.start, accounting.end));
    row['price'] = this.getTableRowItem(priceText);
    row['count'] = this.getTableRowItem(entry.amount.toString());
    table.datas.push(row);
  }
}
