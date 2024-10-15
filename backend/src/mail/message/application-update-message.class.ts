import { Message } from './message.class';
import { ApplicationDto } from '../../shared/dtos/application.dto';
import { ApplicationState } from '../../shared/enums/appliaction-state.enum';

export class ApplicationUpdateMessage extends Message {
  public constructor(application: ApplicationDto, hostUrl: string) {
    const actionString = ApplicationUpdateMessage.getActionString(application);

    let message = '<br><br>Ihr Antrag für ein Benutzerkonto als Einzelschütze wurde <b>' + actionString + '</b>.';

    if (application.comment.length != 0) {
      message += '<br><br>' + application.comment;
    }

    if (application.state == ApplicationState.Open || application.state == ApplicationState.Rejected) {
      const url = hostUrl + '/public/application/' + application.requestId;
      message += '<br><br>Ihren Antrag können Sie <a href="' + url + '">hier</a> einsehen & bearbeiten.';
    }

    if (application.state == ApplicationState.Open) {
      message +=
        '<br>Für die Registrierung wird Folgendes benötigt:<br>' +
        '<ul>' +
        '  <li>Kopie eines gültigen Personalausweises (ID / Pass)</li>' +
        '  <li>Strafregisterauszug oder Kopie WES (beide Dokumente nicht älter als zwei Jahre)</li>' +
        "  <li>Bestätigung über eine Privathaftpflicht-Versicherung mit einer Mindestdeckung von 5'000'000 SFr.<br>" +
        '    Es ist darauf zu achten das Folgendes ersichtlich ist:' +
        '    <ul>' +
        '      <li>Der vollstände Name</li>' +
        '      <li>Die Policen-Nummer</li>' +
        '      <li>Vertragsbeginn & Vertragsablauf</li>' +
        '      <li>Die Versicherungssumme</li>' +
        '    </ul>' +
        '    Kopien von Rechnungen können nicht azeptiert werden.' +
        '  </li>' +
        '</ul>';
    }
    super('Antrag für ein Benutzerkonto als Einzelschütze wurde ' + actionString, message, undefined, undefined);
  }

  public static getActionString(application: ApplicationDto): string {
    switch (application.state) {
      case ApplicationState.Submitted:
        return 'eingereicht';
      case ApplicationState.Accepted:
        return 'akzeptiert';
      case ApplicationState.Rejected:
        return 'zurückgewiesen';
      default:
      case ApplicationState.Open:
        return 'erstellt';
    }
  }
}
