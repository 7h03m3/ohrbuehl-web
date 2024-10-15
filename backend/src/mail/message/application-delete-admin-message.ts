import { Message } from './message.class';
import { ApplicationDto } from '../../shared/dtos/application.dto';

export class ApplicationDeleteAdminMessage extends Message {
  public constructor(application: ApplicationDto) {
    const fullName = application.firstname + ' ' + application.lastname;

    const message =
      '<br><br>Der Antrag für ein Benutzerkonto als Einzelschütze von ' + fullName + ' wurde <b>gelöscht</b>.';

    super('Antrag von ' + fullName + ' wurde gelöscht', message, undefined, undefined);
  }
}
