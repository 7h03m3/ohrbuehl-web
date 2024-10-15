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
  private marginTop = this.mm2Pt(35);
  private marginBottom = this.mm2Pt(25);
  private marginLeft = this.mm2Pt(25);
  private marginRight = this.mm2Pt(25);

  constructor() {
    super();
  }

  public async generatePdf(
    year: number,
    accountingUnitData: ShootingRangeAccountingUnitEntity[],
    @Res() response: any,
  ) {
    const firstEntry = accountingUnitData[0];
    const tempFilename: string = './' + this.getRandomFilename() + '.pdf';
    const filename = 'Schusszahlen_' + firstEntry.organization.abbreviation + '_' + year + '.pdf';
    const title = 'Schusszahlen ' + firstEntry.organization.name + ' ' + year;
    const currentDateString = DateHelper.getDateTimeString(Date.now());

    const doc = new PDFDocument({
      margin: {
        top: this.marginTop,
        bottom: this.marginBottom,
        left: this.marginLeft,
        right: this.marginRight,
      },
      size: 'A4',
    });
    const fileStream = fs.createWriteStream(tempFilename);
    await doc.pipe(fileStream);

    this.addPageHeader(doc);
    this.addNewLine(doc);
    this.addText(title, 18, true, doc);
    this.addText('Stand: ' + currentDateString, 10, false, doc);
    this.addNewLine(doc);

    const totalData = SummarizeHelper.summarizeShootingRangeAccounting(accountingUnitData);
    let table = this.createTable('', 18);
    this.addSummaryTableHeader(table);
    for (const current of totalData) {
      this.addSummaryTableRow(current, table);
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

    this.addNewLine(doc);

    table = null;
    let priceId = 0;
    for (const current of summarizedDays) {
      if (priceId != current.price.id || table == null) {
        if (table != null) {
          await this.addTableToDocument(table, doc);
          this.addNewLine(doc);
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

  private addSummaryTableHeader(table: any) {
    table.headers.push(this.getTableHeaderItem(' Preis', 'price', 'left', 225));
    table.headers.push(this.getTableHeaderItem(' Schüsse', 'count', 'left', 225));
  }

  private addTableHeader(table: any) {
    table.headers.push(this.getTableHeaderItem(' Datum', 'date', 'left', 150));
    table.headers.push(this.getTableHeaderItem(' Preis', 'price', 'left', 225));
    table.headers.push(this.getTableHeaderItem(' Schüsse', 'count', 'left', 75));
  }

  private addSummaryTableRow(entry: ShootingRangeAccountingUnitEntity, table: any) {
    const row: Row = {};

    const accounting = entry.accountingEntry;

    let priceText = entry.price.name;
    if (entry.comment.length != 0) {
      priceText += ' (' + entry.comment + ')';
    }

    row['price'] = this.getTableRowItem(priceText);
    row['count'] = this.getTableRowItem(entry.amount.toString());
    table.datas.push(row);
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
