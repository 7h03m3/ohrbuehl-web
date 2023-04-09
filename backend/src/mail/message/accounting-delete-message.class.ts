import { Message } from './message.class';

export class AccountingDeleteMessage extends Message {
  public constructor(id: number, name: string) {
    super(
      'Schusszahlen vom ' + name + ' gelöscht',
      '<br><br>Die Schusszahlen vom <b>' + name + '</b>' + ' wurden gelöscht.',
      undefined,
      undefined,
    );
  }
}
