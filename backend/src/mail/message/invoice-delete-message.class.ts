import { Message } from './message.class';

export class InvoiceDeleteMessage extends Message {
  public constructor(id: number, name: string) {
    super(
      'Rechnung ' + name + ' gelöscht',
      '<br><br>Die Rechnung <b>' + name + ' (ID: ' + id + ')</b>' + ' wurde gelöscht.',
      undefined,
      undefined,
    );
  }
}
