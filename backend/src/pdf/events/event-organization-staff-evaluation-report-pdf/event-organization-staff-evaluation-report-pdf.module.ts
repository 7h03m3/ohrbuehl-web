import { Module } from '@nestjs/common';
import { EventOrganizationStaffEvaluationReportPdfService } from './event-organization-staff-evaluation-report-pdf.service';

@Module({
  providers: [EventOrganizationStaffEvaluationReportPdfService],
  exports: [EventOrganizationStaffEvaluationReportPdfService],
})
export class EventOrganizationStaffEvaluationReportPdfModule {}
