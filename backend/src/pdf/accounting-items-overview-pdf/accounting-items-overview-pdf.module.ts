import { Module } from '@nestjs/common';
import { AccountingItemsOverviewPdfService } from './accounting-items-overview-pdf.service';

@Module({
  providers: [AccountingItemsOverviewPdfService],
  exports: [AccountingItemsOverviewPdfService],
})
export class AccountingItemsOverviewPdfModule {}
