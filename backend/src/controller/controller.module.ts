import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersModule } from '../database/users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from '../auth/auth.module';
import { OrganizationsController } from './organizations/organizations.controller';
import { ShootingRangePricesController } from './shooting-range-price/shooting-range-prices.controller';
import { OrganizationsModule } from '../database/organizations/organizations.module';
import { ShootingRangePriceModule } from '../database/shooting-range-price/shooting-range-price.module';
import { InvoiceController } from './invoice/invoice.controller';
import { InvoicePdfModule } from '../pdf/invoice-pdf/invoicePdfModule';
import { InvoiceModule } from '../database/invoice/invoice.module';
import { InvoiceItemModule } from '../database/invoice-item/invoice-item.module';
import { SharedModule } from '../shared/shared.module';
import { ShootingRangeAccountingController } from './shooting-range-accounting/shooting-range-accounting.controller';
import { ShootingRangeAccountingModule } from '../database/shooting-range-accounting/shooting-range-accounting.module';
import { ShootingRangeAccountingPdfModule } from '../pdf/accounting-pdf/shooting-range-accounting-pdf.module';
import { EventsController } from './events/events.controller';
import { EventsModule } from '../database/events/events.module';
import { EventsCategoryController } from './events/events-category.controller';
import { EventsShiftCategoryController } from './events/events-shift-category.controller';
import { EventsShiftController } from './events/events-shift.controller';
import { OrganizationsMemberController } from './organizations/organizations-member.controller';
import { EventsStaffPoolController } from './events/events-staff-pool.controller';
import { EventReportPdfModule } from '../pdf/events/event-report-pdf/event-report-pdf.module';
import { EventOrganizationReportPdfModule } from '../pdf/events/event-organization-report-pdf/event-organization-report-pdf.module';
import { EventOrganizationStaffReportPdfModule } from '../pdf/events/event-organization-staff-report-pdf/event-organization-staff-report-pdf.module';
import { NotificationManagerModule } from '../notification-manager/notification-manager.module';
import { NotificationsController } from './notifications/notifications.controller';
import { NotificationModule } from '../database/notification/notification.module';
import { BusinessHoursController } from './business-hours/business-hours.controller';
import { BusinessHoursOrganizationController } from './business-hours/business-hours-organization.controller';
import { BusinessHoursSingleController } from './business-hours/business-hours-single.controller';
import { BusinessHoursAdminController } from './business-hours/business-hours-admin.controller';
import { BusinessHoursModule } from '../database/business-hours/business-hours.module';
import { ConfigModule } from '@nestjs/config';
import { BusinessHoursConfigService } from './business-hours/helpers/business-hours-config.service';

@Module({
  imports: [
    UsersModule,
    OrganizationsModule,
    ShootingRangeAccountingPdfModule,
    ShootingRangePriceModule,
    ShootingRangeAccountingModule,
    InvoicePdfModule,
    InvoiceModule,
    InvoiceItemModule,
    EventsModule,
    EventReportPdfModule,
    EventOrganizationReportPdfModule,
    EventOrganizationStaffReportPdfModule,
    AuthModule,
    NotificationModule,
    NotificationManagerModule,
    SharedModule,
    BusinessHoursModule,
    ConfigModule,
  ],
  providers: [BusinessHoursConfigService],
  controllers: [
    UsersController,
    AuthController,
    OrganizationsController,
    OrganizationsMemberController,
    ShootingRangePricesController,
    ShootingRangeAccountingController,
    InvoiceController,
    EventsController,
    EventsCategoryController,
    EventsShiftCategoryController,
    EventsShiftController,
    EventsStaffPoolController,
    NotificationsController,
    BusinessHoursController,
    BusinessHoursOrganizationController,
    BusinessHoursSingleController,
    BusinessHoursAdminController,
  ],
  exports: [],
})
export class ControllerModule {}
