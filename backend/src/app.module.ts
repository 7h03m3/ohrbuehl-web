import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ControllerModule } from './controller/controller.module';
import { AuthModule } from './auth/auth.module';
import { InvoicePdfModule } from './pdf/invoice-pdf/invoicePdfModule';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { ShootingRangeAccountingPdfModule } from './pdf/accounting-pdf/shooting-range-accounting-pdf.module';
import { EventReportPdfModule } from './pdf/events/event-report-pdf/event-report-pdf.module';
import { EventOrganizationReportPdfModule } from './pdf/events/event-organization-report-pdf/event-organization-report-pdf.module';
import { EventOrganizationStaffReportPdfModule } from './pdf/events/event-organization-staff-report-pdf/event-organization-staff-report-pdf.module';
import { MailModule } from './mail/mail.module';
import { NotificationManagerModule } from './notification-manager/notification-manager.module';
import configuration from './config/configuration';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    MailModule,
    ControllerModule,
    AuthModule,
    InvoicePdfModule,
    ShootingRangeAccountingPdfModule,
    SharedModule,
    EventReportPdfModule,
    EventOrganizationReportPdfModule,
    EventOrganizationStaffReportPdfModule,
    NotificationManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
