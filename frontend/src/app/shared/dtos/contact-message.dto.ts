import { ContactMessageStatus } from '../../shared/enums/contact-message-status.enum';

export class ContactMessageDto {
  id: number;
  date: number;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
  status: ContactMessageStatus;

  constructor() {
    this.id = 0;
    this.date = Date.now();
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.mobile = '';
    this.subject = '';
    this.message = '';
    this.status = ContactMessageStatus.Open;
  }
}
