import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { ShootingRangeAccountingPdfService } from './shooting-range-accounting-pdf.service';

@Module({
  providers: [ShootingRangeAccountingPdfService],
  imports: [SharedModule],
  exports: [ShootingRangeAccountingPdfService],
})
export class ShootingRangeAccountingPdfModule {}
