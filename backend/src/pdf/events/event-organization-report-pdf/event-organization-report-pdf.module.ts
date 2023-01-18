import { Module } from '@nestjs/common';
import { EventOrganizationReportPdfService } from './event-organization-report-pdf.service';
import { SharedModule } from '../../../shared/shared.module';

@Module({
  providers: [EventOrganizationReportPdfService],
  imports: [SharedModule],
  exports: [EventOrganizationReportPdfService],
})
export class EventOrganizationReportPdfModule {}
