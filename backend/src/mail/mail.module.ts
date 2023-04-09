import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { InvoiceModule } from '../database/invoice/invoice.module';
import { InvoicePdfModule } from '../pdf/invoice-pdf/invoicePdfModule';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'XXX',
          pass: 'XXX',
        },
      },
      defaults: {
        from: '"Schiessanlage Ohrbühl" <ohrbuehl@gmail.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    InvoiceModule,
    InvoicePdfModule,
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
