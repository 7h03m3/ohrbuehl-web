import { Message } from './message.class';
import { InvoiceEntity } from '../../database/entities/invoice.entity';

export class InvoiceUpdateMessage extends Message {
  public constructor(invoice: InvoiceEntity) {
    super(
      'Aktualisierte Rechnung ' + invoice.title,
      '<br><br>Die Rechnung <b>' +
        invoice.title +
        ' (ID: ' +
        invoice.id +
        ')</b> von ' +
        invoice.creator.firstName +
        ' ' +
        invoice.creator.lastName +
        ' wurde aktualisiert. Du findest sie im Anhang.',
    );
  }
}
