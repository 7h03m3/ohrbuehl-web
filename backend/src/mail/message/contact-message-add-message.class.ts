import { Message } from './message.class';
import { ContactMessageEntity } from '../../database/entities/contact-message.entity';

export class ContactMessageAddMessage extends Message {
  public constructor(contactMessage: ContactMessageEntity) {
    const name = contactMessage.firstname + ' ' + contactMessage.lastname;
    const message = contactMessage.message.replace(/\n/g, '<br>');
    super(
      'Neue Nachricht von ' + name + ': ' + contactMessage.subject,
      '<br><br>Es wurde eine neue Nachricht von ' +
        name +
        ' (' +
        contactMessage.email +
        ', ' +
        contactMessage.mobile +
        ') erhalten:<br><br><hr>' +
        message +
        '<hr>',
      undefined,
      undefined,
    );
  }
}
