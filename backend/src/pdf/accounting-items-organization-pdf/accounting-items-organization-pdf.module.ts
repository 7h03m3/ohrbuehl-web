import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { AccountingItemsOrganizationPdfService } from './accounting-items-organization-pdf.service';

@Module({
  providers: [AccountingItemsOrganizationPdfService],
  imports: [SharedModule],
  exports: [AccountingItemsOrganizationPdfService],
})
export class AccountingItemsOrganizationPdfModule {}
