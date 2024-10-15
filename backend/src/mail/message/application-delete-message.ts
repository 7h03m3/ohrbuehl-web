import { Message } from './message.class';

export class ApplicationDeleteMessage extends Message {
  public constructor() {
    const message = '<br><br>Ihr Antrag für ein Benutzerkonto als Einzelschütze wurde <b>gelöscht</b>.';
    super('Antrag für ein Benutzerkonto als Einzelschütze wurde gelöscht', message, undefined, undefined);
  }
}
