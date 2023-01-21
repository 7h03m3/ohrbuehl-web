import { Module } from '@nestjs/common';
import { SharedModule } from '../../../shared/shared.module';
import { EventReportPdfService } from './event-report-pdf.service';

@Module({
  providers: [EventReportPdfService],
  imports: [SharedModule],
  exports: [EventReportPdfService],
})
export class EventReportPdfModule {}
