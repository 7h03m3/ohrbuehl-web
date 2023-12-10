import { Module } from '@nestjs/common';
import { BusinessHourDayPdfService } from './business-hour-day-pdf.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
  providers: [BusinessHourDayPdfService],
  imports: [SharedModule],
  exports: [BusinessHourDayPdfService],
})
export class BusinessHourDayPdfModule {}
