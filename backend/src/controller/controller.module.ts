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
import { InvoicePdfModule } from '../invoice-pdf/invoicePdfModule';
import { InvoiceModule } from '../database/invoice/invoice.module';
import { InvoiceItemModule } from '../database/invoice-item/invoice-item.module';
import { SharedModule } from '../shared/shared.module';
import { ShootingRangeAccountingController } from './shooting-range-accounting/shooting-range-accounting.controller';
import { ShootingRangeAccountingModule } from '../database/shooting-range-accounting/shooting-range-accounting.module';

@Module({
  imports: [
    UsersModule,
    OrganizationsModule,
    ShootingRangePriceModule,
    ShootingRangeAccountingModule,
    InvoicePdfModule,
    InvoiceModule,
    InvoiceItemModule,
    AuthModule,
    SharedModule,
  ],
  providers: [],
  controllers: [
    UsersController,
    AuthController,
    OrganizationsController,
    ShootingRangePricesController,
    ShootingRangeAccountingController,
    InvoiceController,
    ShootingRangeAccountingController,
  ],
  exports: [],
})
export class ControllerModule {}
