import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { InvoiceModule } from '../database/invoice/invoice.module';
import { InvoicePdfModule } from '../pdf/invoice-pdf/invoicePdfModule';
import { ShootingRangeAccountingModule } from '../database/shooting-range-accounting/shooting-range-accounting.module';
import { ShootingRangeAccountingPdfModule } from '../pdf/accounting-pdf/shooting-range-accounting-pdf.module';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('mail.host'),
          port: configService.get<number>('mail.port'),
          ignoreTLS: configService.get('mail.ignoreTLS'),
          secure: configService.get('mail.secure'),
          auth: {
            user: configService.get('mail.user'),
            pass: configService.get('mail.password'),
          },
        },
        defaults: {
          from: configService.get('mail.from'),
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    InvoiceModule,
    InvoicePdfModule,
    ShootingRangeAccountingModule,
    ShootingRangeAccountingPdfModule,
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
