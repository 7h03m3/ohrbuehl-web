import { Message } from './message.class';
import { ApplicationDto } from '../../shared/dtos/application.dto';
import { ApplicationUpdateMessage } from './application-update-message.class';

export class ApplicationUpdateAdminMessage extends Message {
  public constructor(application: ApplicationDto, hostUrl: string) {
    const actionString = ApplicationUpdateMessage.getActionString(application);
    const fullName = application.firstname + ' ' + application.lastname;

    let message =
      '<br><br>Der Antrag für ein Benutzerkonto als Einzelschütze von ' +
      fullName +
      ' wurde <b>' +
      actionString +
      '</b>.';

    if (application.comment.length != 0) {
      message += '<br><br>' + application.comment;
    }

    super('Antrag von ' + fullName + ' wurde ' + actionString, message, undefined, undefined);
  }
}
