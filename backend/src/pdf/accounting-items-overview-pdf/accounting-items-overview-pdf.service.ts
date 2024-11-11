import { Injectable, Res } from '@nestjs/common';
import { PdfBase } from '../base/pdf-base.class';
import { ShootingRangeAccountingUnitEntity } from '../../database/entities/shooting-range-accounting-unit.entity';
import { DateHelper } from '../../shared/classes/date-helper';
import { SummarizeHelper } from '../../shared/classes/summarize-helper';
import { PdfTableRowItem } from '../base/classes/pdf-table-row-item';

const PDFDocument = require('pdfkit-table');

const fs = require('fs');
type Row = Record<string, PdfTableRowItem>;

@Injectable()
export class AccountingItemsOverviewPdfService extends PdfBase {
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
    const tempFilename: string = './' + this.getRandomFilename() + '.pdf';
    const filename = 'Schusszahlen_' + year + '.pdf';
    const title = 'Schusszahlen ' + year;
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
    this.addNewLine(doc);
    this.addNewLine(doc);
    this.addText(title, 18, true, doc);
    this.addText('Stand: ' + currentDateString, 10, false, doc);
    this.addNewLine(doc);

    const organizationData = SummarizeHelper.summarizeShootingRangeAccountingByOrganization(accountingUnitData);
    const organizationTable = this.createTable('', 18);

    this.addOrganizationTableHeader(organizationTable);
    for (const current of organizationData) {
      this.addOrganizationTableRow(current, organizationTable);
    }
    await this.addTableToDocument(organizationTable, doc);

    doc.addPage();

    const priceData = SummarizeHelper.summarizeShootingRangeAccountingByPriceAndComment(accountingUnitData);
    const priceTable = this.createTable('', 18);
    this.addPriceTableHeader(priceTable);
    for (const current of priceData) {
      this.addPriceTableRow(current, priceTable);
    }
    await this.addTableToDocument(priceTable, doc);

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

  private addPriceTableHeader(table: any) {
    table.headers.push(this.getTableHeaderItem(' Preis', 'price', 'left', 225));
    table.headers.push(this.getTableHeaderItem(' Schüsse', 'count', 'left', 225));
  }

  private addPriceTableRow(entry: ShootingRangeAccountingUnitEntity, table: any) {
    const row: Row = {};

    let priceText = entry.price.name;
    if (entry.comment.length != 0) {
      priceText += ' (' + entry.comment + ')';
    }

    row['price'] = this.getTableRowItem(priceText);
    row['count'] = this.getTableRowItem(entry.amount.toString());
    table.datas.push(row);
  }

  private addOrganizationTableHeader(table: any) {
    table.headers.push(this.getTableHeaderItem(' Verein', 'organization', 'left', 225));
    table.headers.push(this.getTableHeaderItem(' Schüsse', 'count', 'left', 225));
  }

  private addOrganizationTableRow(entry: ShootingRangeAccountingUnitEntity, table: any) {
    const row: Row = {};

    row['organization'] = this.getTableRowItem(entry.organization.name);
    row['count'] = this.getTableRowItem(entry.amount.toString());
    table.datas.push(row);
  }
}
