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
    AuthModule,
    SharedModule,
  ],
  providers: [],
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
  ],
  exports: [],
})
export class ControllerModule {}
