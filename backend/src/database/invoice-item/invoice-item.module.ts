import { Module } from '@nestjs/common';
import { InvoiceItemService } from './invoice-item.service';

@Module({
  providers: [InvoiceItemService],
})
export class InvoiceItemModule {}
