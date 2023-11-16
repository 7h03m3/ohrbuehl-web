import { Message } from './message.class';

export class UserRegisterMessage extends Message {
  constructor(username: string, token: string, hostUrl: string) {
    super(
      'Bestätigung der E-Mail Adresse',
      '<br><br>Bitte bestätigen Sie die E-Mail Adresse durch anklicken des folgenden Links: <br>' +
        '<a href="' +
        hostUrl +
        '/user/register/confirm?userName=' +
        username +
        '&token=' +
        token +
        '">' +
        hostUrl +
        '/user/register/confirm?userName=' +
        username +
        '&token=' +
        token +
        '</a>',
      undefined,
      undefined,
    );
  }
}
