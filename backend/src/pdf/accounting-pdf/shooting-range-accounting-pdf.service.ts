import { Injectable } from '@nestjs/common';
import { ShootingRangeAccountingEntity } from '../../database/entities/shooting-range-accounting.entity';
import * as fs from 'fs';
import { PDFRow, PDFTable } from 'swissqrbill/lib/node/cjs/pdf/extended-pdf';
import { ShootingRangeAccountingUnitEntity } from '../../database/entities/shooting-range-accounting-unit.entity';
import { PDF } from 'swissqrbill';
import { Data } from 'swissqrbill/lib/node/cjs/shared/types';
import { ShootingRangeAccountingTypeEnum } from '../../shared/enums/shooting-range-accounting-type.enum';
import { PdfBase } from '../base/pdf-base.class';
import { SummarizeHelper } from '../../shared/classes/summarize-helper';
import { DateHelper } from '../../shared/classes/date-helper';
import { PdfFile } from '../base/classes/pdf-file.class';

@Injectable()
export class ShootingRangeAccountingPdfService extends PdfBase {
  constructor() {
    super();
  }

  private static getTypeString(type: ShootingRangeAccountingTypeEnum): string {
    switch (type) {
      case ShootingRangeAccountingTypeEnum.Section_300m:
        return '300m';
      case ShootingRangeAccountingTypeEnum.Section_100m:
        return '100m';
      case ShootingRangeAccountingTypeEnum.Section_50m:
        return '50m';
      case ShootingRangeAccountingTypeEnum.Section_25m:
        return '25m';
      default:
        return '';
    }
  }

  async generatePdf(accountingData: ShootingRangeAccountingEntity): Promise<PdfFile> {
    accountingData.items = SummarizeHelper.summarizeShootingRangeAccounting(accountingData.items);

    const tempFilename: string = './' + this.getRandomFilename() + '.pdf';
    const filename =
      'Schusszahlen_' +
      DateHelper.getDateFileName(accountingData.start) +
      '_' +
      ShootingRangeAccountingPdfService.getTypeString(accountingData.type) +
      '_' +
      DateHelper.getTimeFileName(accountingData.start) +
      '_' +
      DateHelper.getTimeFileName(accountingData.end) +
      '_id_' +
      accountingData.id +
      '.pdf';

    const data: Data = {
      currency: 'CHF',
      amount: 0,
      message: '',
      creditor: {
        name: '',
        address: '',
        buildingNumber: 0,
        zip: 0,
        city: '',
        account: 'CH8109000000907847005',
        country: 'CH',
      },
    };

    const pdf = await new PDF(data, tempFilename, {
      autoGenerate: false,
      size: 'A4',
    });

    pdf.pipe(fs.createWriteStream(tempFilename));

    this.addPageHeader(pdf);
    this.addTitle(
      'Schusszahlen ' +
        ShootingRangeAccountingPdfService.getTypeString(accountingData.type) +
        ' ' +
        DateHelper.getDateString(accountingData.start) +
        ' ' +
        DateHelper.getTimeString(accountingData.start) +
        ' - ' +
        DateHelper.getTimeString(accountingData.end),
      pdf,
    );

    this.addTable(accountingData.items, accountingData.total, pdf);

    return this.returnFile(pdf, filename, tempFilename);
  }

  private addTitle(title: string, pdf: PDF) {
    pdf.fontSize(14);
    pdf.font('Helvetica-Bold');
    pdf.text(title, this.mm2Pt(20), this.mm2Pt(35), {
      width: this.mm2Pt(170),
      align: 'left',
    });
  }

  private addTable(items: ShootingRangeAccountingUnitEntity[], total: number, pdf: PDF) {
    const commentWidth = this.mm2Pt(25);
    const amountWidth = this.mm2Pt(20);
    const priceWidth = this.mm2Pt(45);

    const table: PDFTable = {
      width: this.mm2Pt(170),
      x: this.mm2Pt(20),
      y: this.mm2Pt(45),
      lineWidth: 1,
      rows: [
        {
          height: 24,
          padding: [8, 0, 0, 4],
          fillColor: '#ECF0F1',
          columns: [
            {
              text: 'Verein',
            },
            {
              text: 'Kommentar',
              width: commentWidth,
            },
            {
              text: 'Preis',
              width: priceWidth,
            },
            {
              text: 'Anzahl',
              width: amountWidth,
            },
          ],
        },
      ],
    };

    items.forEach((entry) => {
      this.addTableItem(entry, table);
    });

    const totalAmountRowItem: PDFRow = {
      height: 40,
      columns: [
        {
          text: '',
        },
        {
          text: '',
          width: commentWidth,
        },
        {
          text: 'Total',
          font: 'Helvetica-Bold',
          width: priceWidth,
        },
        {
          text: total,
          width: amountWidth,
          font: 'Helvetica-Bold',
        },
      ],
    };

    table.rows.push(totalAmountRowItem);

    pdf.addTable(table);
  }

  private addTableItem(item: ShootingRangeAccountingUnitEntity, table: PDFTable) {
    const commentWidth = this.mm2Pt(25);
    const amountWidth = this.mm2Pt(20);
    const priceWidth = this.mm2Pt(45);

    const rowItem: PDFRow = {
      columns: [
        {
          text: item.organization.name + ' (' + item.organization.abbreviation + ')',
          font: 'Helvetica',
        },
        {
          text: item.comment,
          font: 'Helvetica',
          width: commentWidth,
        },
        {
          text: item.price.name + ' (' + item.price.price + ' SFr.)',
          width: priceWidth,
        },
        {
          text: item.amount,
          width: amountWidth,
          font: 'Helvetica',
        },
      ],
    };

    table.rows.push(rowItem);
  }
}
