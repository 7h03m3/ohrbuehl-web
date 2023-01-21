import { createReadStream, unlink, WriteStream } from 'fs';
import { Res } from '@nestjs/common';
import { FileHelper } from '../../shared/classes/file-helper';
import { PdfTableRowItem } from './classes/pdf-table-row-item';
import { PdfTableHeaderItem } from './classes/pdf-table-header-item';

export class PdfBase {
  private fileHelper = new FileHelper();

  constructor() {}

  protected finishDocument(doc: any, fileStream: WriteStream, tempFilename: string, filename: string, @Res() response) {
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

  protected getRandomFilename(): string {
    return this.fileHelper.getRandomFilename();
  }

  protected mm2Pt(millimeters: number) {
    return millimeters * 2.8346456692913;
  }

  protected createTable(title: string, titleFontSize: number): any {
    const table = {
      title: {
        label: title,
        fontSize: titleFontSize,
      },
      subtitle: '',
      headers: [],
      datas: [],
    };

    return table;
  }

  protected getTableRowItem(label: string): PdfTableRowItem {
    const rowItem = new PdfTableRowItem();
    rowItem.label = ' ' + label;
    rowItem.options.fontSize = 10;

    return rowItem;
  }

  protected setTableRowItemColor(color: string, opacity: number, item: PdfTableRowItem) {
    item.options.backgroundOpacity = opacity;
    item.options.backgroundColor = color;
  }

  protected getTableHeaderItem(label: string, property: string, align: string, width: number) {
    const item = new PdfTableHeaderItem();
    item.label = label;
    item.property = property;
    item.align = align;
    item.width = width;
    return item;
  }
}
