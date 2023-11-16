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
import { ShootingRangeAccountingService } from '../database/shooting-range-accounting/shooting-range-accounting.service';
import { ShootingRangeAccountingPdfService } from '../pdf/accounting-pdf/shooting-range-accounting-pdf.service';
import { ShootingRangeAccountingEntity } from '../database/entities/shooting-range-accounting.entity';
import { AccountingDeleteMessage } from './message/accounting-delete-message.class';
import { AccountingUpdateMessage } from './message/accounting-update-message.class';
import { AccountingAddMessage } from './message/accounting-add-message.class';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private static readonly AppendText =
    '<br><br>Freundliche Grüsse<br>' +
    'Schiessanlage Ohrbühl<br><br>' +
    '<i>P.S. Bitte nicht auf diese Nachricht antworten, E-Mails auf diese Adresse werden nicht gelesen.</i>';

  constructor(
    private readonly mailerService: MailerService,
    private invoiceService: InvoiceService,
    private invoicePdfService: InvoicePdfService,
    private accountingService: ShootingRangeAccountingService,
    private accountingPdfServer: ShootingRangeAccountingPdfService,
    private configService: ConfigService,
  ) {}

  public async sendInvoiceAdd(event: NotificationEntity, receiverList: NotificationReceiverEntity[]) {
    const [invoice, pdf, buffer] = await this.getInvoiceData(event.targetId);
    if (!invoice) {
      return;
    }

    const message = new InvoiceAddMessage(invoice, pdf, buffer);
    await this.sendMailBulk(message, receiverList);
  }

  public async sendInvoiceUpdate(event: NotificationEntity, receiverList: NotificationReceiverEntity[]) {
    const [invoice, pdf, buffer] = await this.getInvoiceData(event.targetId);
    if (!invoice) {
      return;
    }

    const message = new InvoiceUpdateMessage(invoice, pdf, buffer);
    await this.sendMailBulk(message, receiverList);
  }

  public async sendInvoiceDelete(event: NotificationEntity, receiverList: NotificationReceiverEntity[]) {
    const message = new InvoiceDeleteMessage(event.targetId, event.comment);
    await this.sendMailBulk(message, receiverList);
  }

  public async senAccountingAdd(event: NotificationEntity, receiverList: NotificationReceiverEntity[]) {
    const [accountingData, pdf, buffer] = await this.getAccountingData(event.targetId);
    if (!accountingData) {
      return;
    }

    const message = new AccountingAddMessage(accountingData, pdf, buffer);
    await this.sendMailBulk(message, receiverList);
  }

  public async sendAccountingUpdate(event: NotificationEntity, receiverList: NotificationReceiverEntity[]) {
    const [accountingData, pdf, buffer] = await this.getAccountingData(event.targetId);
    if (!accountingData) {
      return;
    }

    const message = new AccountingUpdateMessage(accountingData, pdf, buffer);
    await this.sendMailBulk(message, receiverList);
  }

  public async sendAccountingDelete(event: NotificationEntity, receiverList: NotificationReceiverEntity[]) {
    const message = new AccountingDeleteMessage(event.targetId, event.comment);
    await this.sendMailBulk(message, receiverList);
  }

  private async getInvoiceData(id: number): Promise<[InvoiceEntity, PdfFile, Buffer]> {
    const invoice = await this.invoiceService.findOne(id);
    if (!invoice) {
      console.log('Invoice with id ' + id + ' not found, could not send notification e-mail.');
      return [undefined, undefined, undefined];
    }

    const pdf = await this.invoicePdfService.generatePdf(invoice);
    const buffer = await pdf.getBuffer();
    return [invoice, pdf, buffer];
  }

  private async getAccountingData(id: number): Promise<[ShootingRangeAccountingEntity, PdfFile, Buffer]> {
    const accountingData = await this.accountingService.findOne(id);
    if (!accountingData) {
      console.log('Accounting data with id ' + id + ' not found, could not send notification e-mail.');
      return [undefined, undefined, undefined];
    }

    const pdf = await this.accountingPdfServer.generatePdf(accountingData);
    const buffer = await pdf.getBuffer();
    return [accountingData, pdf, buffer];
  }

  private async sendMailBulk(message: Message, receiverList: NotificationReceiverEntity[]) {
    for (const receiver of receiverList) {
      await this.sendMail(receiver.name, receiver.email, message);
    }
  }

  private async sendMail(name: string, email: string, message: Message) {
    const prependText = 'Hallo ' + name;

    await this.mailerService
      .sendMail({
        to: email,
        from: 'Schiessanlage Ohrbühl <ohrbuehl@gmail.com>',
        subject: message.getSubject(),
        html: prependText + message.getText() + MailService.AppendText,
        attachments: message.getAttachments(),
      })
      .then((message) => {})
      .catch((message) => {
        console.log(message);
      });
  }
}
