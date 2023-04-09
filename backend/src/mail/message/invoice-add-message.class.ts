import { Message } from './message.class';
import { InvoiceEntity } from '../../database/entities/invoice.entity';
import { PdfFile } from '../../pdf/base/classes/pdf-file.class';
import Buffer from 'buffer';

export class InvoiceAddMessage extends Message {
  public constructor(invoice: InvoiceEntity, pdfFile: PdfFile, buffer: Buffer | undefined) {
    super(
      'Neue Rechnung ' + invoice.title,
      '<br><br>Es wurde eine neue Rechnung <b>' +
        invoice.title +
        ' (ID: ' +
        invoice.id +
        ')</b> von ' +
        invoice.creator.firstName +
        ' ' +
        invoice.creator.lastName +
        ' erstellt. Du findest sie im Anhang.',
      pdfFile,
      buffer,
    );
  }
}
