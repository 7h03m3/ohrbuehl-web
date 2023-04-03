import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public test(): void {
    this.mailerService
      .sendMail({
        to: 'thomas.stanger@staswiss.ch', // list of receivers
        from: 'ohrbuehl@gmail.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then((message) => {
        console.log(message);
      })
      .catch((message) => {
        console.log(message);
      });
  }
}
