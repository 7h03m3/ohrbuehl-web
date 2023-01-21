import { Module } from '@nestjs/common';
import { EventOrganizationStaffReportPdfService } from './event-organization-staff-report-pdf.service';
import { SharedModule } from '../../../shared/shared.module';

@Module({
  providers: [EventOrganizationStaffReportPdfService],
  imports: [SharedModule],
  exports: [EventOrganizationStaffReportPdfService],
})
export class EventOrganizationStaffReportPdfModule {}
