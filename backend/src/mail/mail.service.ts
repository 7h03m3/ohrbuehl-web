import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PdfFile } from '../pdf/base/classes/pdf-file.class';
import { NotificationReceiverEntity } from '../database/entities/notification-receiver.entity';
import { NotificationEntity } from '../database/entities/notification.entity';
import { InvoiceService } from '../database/invoice/invoice.service';
import { InvoicePdfService } from '../pdf/invoice-pdf/invoice-pdf.service';
import { InvoiceEntity } from '../database/entities/invoice.entity';
import { Message } from './message/message.class';
import { InvoiceAddMessage } from './message/invoice-add-message.class';
import { InvoiceUpdateMessage } from './message/invoice-update-message.class';
import { InvoiceDeleteMessage } from './message/invoice-delete-message.class';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private invoiceService: InvoiceService,
    private invoicePdfService: InvoicePdfService,
  ) {}

  public async sendInvoiceAdd(event: NotificationEntity, receiverList: NotificationReceiverEntity[]) {
    const [invoice, pdf, pdfBuffer] = await this.getInvoiceData(event.targetId);
    if (!invoice) {
      return;
    }

    const message = new InvoiceAddMessage(invoice);
    this.sendMailWithAttachment(message, pdf, pdfBuffer, receiverList);
  }

  public async sendInvoiceUpdate(event: NotificationEntity, receiverList: NotificationReceiverEntity[]) {
    const [invoice, pdf, pdfBuffer] = await this.getInvoiceData(event.targetId);
    if (!invoice) {
      return;
    }

    const message = new InvoiceUpdateMessage(invoice);
    this.sendMailWithAttachment(message, pdf, pdfBuffer, receiverList);
  }

  public async sendInvoiceDelete(event: NotificationEntity, receiverList: NotificationReceiverEntity[]) {
    const message = new InvoiceDeleteMessage(event.targetId, event.comment);
    this.sendMail(message, receiverList);
  }

  private async getInvoiceData(id: number): Promise<[InvoiceEntity, PdfFile, Buffer]> {
    const invoice = await this.invoiceService.findOne(id);
    if (!invoice) {
      console.log('Invoice with id ' + id + ' not found, could not send notification e-mail.');
      return [undefined, undefined, undefined];
    }

    const pdf = await this.invoicePdfService.generatePdf(invoice);
    const pdfBuffer = await pdf.getBuffer();
    return [invoice, pdf, pdfBuffer];
  }

  private sendMail(message: Message, receiverList: NotificationReceiverEntity[]) {
    receiverList.forEach((receiver) => {
      this.mailerService
        .sendMail({
          to: receiver.email,
          from: 'Schiessanlage Ohrbühl <ohrbuehl@gmail.com>',
          subject: message.getSubject(),
          html: 'Hallo ' + receiver.name + message.getText() + this.getAppendText(),
        })
        .then((message) => {})
        .catch((message) => {
          console.log(message);
        });
    });
  }

  private sendMailWithAttachment(
    message: Message,
    pdf: PdfFile,
    buffer: Buffer,
    receiverList: NotificationReceiverEntity[],
  ) {
    receiverList.forEach((receiver) => {
      this.mailerService
        .sendMail({
          to: receiver.email,
          from: 'Schiessanlage Ohrbühl <ohrbuehl@gmail.com>',
          subject: message.getSubject(),
          html: 'Hallo ' + receiver.name + message.getText() + this.getAppendText(),
          attachments: [
            {
              filename: pdf.filename,
              contentType: pdf.contentType,
              content: buffer,
            },
          ],
        })
        .then((message) => {})
        .catch((message) => {
          console.log(message);
        });
    });
  }

  private getAppendText(): string {
    return '<br><br>Freundliche Grüsse<br>Schiessanlage Ohrbühl<br><br><i>P.S. Bitte nicht auf dieses Nachricht antworten, E-Mails auf diese Adresse werden nicht gelesen.</i>';
  }
}
