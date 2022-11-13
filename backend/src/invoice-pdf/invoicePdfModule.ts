import { Module } from '@nestjs/common';
import { InvoicePdfService } from './invoice-pdf.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  providers: [InvoicePdfService],
  imports: [SharedModule],
  exports: [InvoicePdfService],
})
export class InvoicePdfModule {}
