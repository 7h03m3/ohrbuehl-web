import { Injectable, Res } from '@nestjs/common';
import { ShootingRangeAccountingEntity } from '../../database/entities/shooting-range-accounting.entity';
import * as fs from 'fs';
import { createReadStream, unlink } from 'fs';
import { PDFRow, PDFTable } from 'swissqrbill/lib/node/cjs/pdf/extended-pdf';
import { ShootingRangeAccountingUnitEntity } from '../../database/entities/shooting-range-accounting-unit.entity';
import { PDF } from 'swissqrbill';
import { Data } from 'swissqrbill/lib/node/cjs/shared/types';
import { DateHelper } from '../../shared/classes/date-helper';
import { ShootingRangeAccountingTypeEnum } from '../../shared/enums/shooting-range-accounting-type.enum';

@Injectable()
export class ShootingRangeAccountingPdfService {
  constructor(private dateHelper: DateHelper) {}

  async generatePdf(accountingData: ShootingRangeAccountingEntity, @Res() response) {
    const tempFilename: string = './' + this.getRandomFilename() + '.pdf';
    const filename =
      'Schusszahlen_' +
      this.dateHelper.getDateFileName(accountingData.date) +
      '_' +
      this.getTypeString(accountingData.type) +
      '_' +
      this.getTimeFileString(accountingData.startTime) +
      '_' +
      this.getTimeFileString(accountingData.endTime) +
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

    this.addTitle(
      'Schusszahlen ' +
        this.getTypeString(accountingData.type) +
        ' ' +
        this.dateHelper.getDateString(accountingData.date) +
        ' ' +
        accountingData.startTime +
        ' - ' +
        accountingData.endTime,
      pdf,
    );
    this.addTable(accountingData.items, accountingData.total, pdf);

    pdf.end();

    pdf.on('finish', () => {
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

  private getRandomFilename(): string {
    const crypto = require('crypto');
    return crypto.randomBytes(20).toString('hex');
  }

  private getTimeFileString(time: string): string {
    return time.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  }

  private getTypeString(type: ShootingRangeAccountingTypeEnum): string {
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

  private addTitle(title: string, pdf: PDF) {
    pdf.fontSize(14);
    pdf.font('Helvetica-Bold');
    pdf.text(title, this.mm2Pt(20), this.mm2Pt(20), {
      width: this.mm2Pt(170),
      align: 'left',
    });
  }

  private addTable(items: ShootingRangeAccountingUnitEntity[], total: number, pdf: PDF) {
    const trackWidth = this.mm2Pt(17);
    const amountWidth = this.mm2Pt(20);
    const priceWidth = this.mm2Pt(45);

    const table: PDFTable = {
      width: this.mm2Pt(170),
      x: this.mm2Pt(20),
      y: this.mm2Pt(30),
      lineWidth: 1,
      rows: [
        {
          height: 24,
          padding: [8, 0, 0, 4],
          fillColor: '#ECF0F1',
          columns: [
            {
              text: 'Scheibe',
              width: trackWidth,
            },
            {
              text: 'Verein',
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
          width: trackWidth,
        },
        {
          text: '',
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
    const trackWidth = this.mm2Pt(17);
    const amountWidth = this.mm2Pt(20);
    const priceWidth = this.mm2Pt(45);

    const rowItem: PDFRow = {
      columns: [
        {
          text: item.track,
          width: trackWidth,
        },
        {
          text: item.organization.name + ' (' + item.organization.abbreviation + ')',
          font: 'Helvetica',
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

  private mm2Pt(millimeters: number) {
    return millimeters * 2.8346456692913;
  }
}
