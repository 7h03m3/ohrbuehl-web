import { Test, TestingModule } from '@nestjs/testing';
import { EventOrganizationStaffEvaluationReportPdfService } from './event-organization-staff-evaluation-report-pdf.service';

describe('EventOrganizationStaffEvaluationReportPdfService', () => {
  let service: EventOrganizationStaffEvaluationReportPdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventOrganizationStaffEvaluationReportPdfService],
    }).compile();

    service = module.get<EventOrganizationStaffEvaluationReportPdfService>(EventOrganizationStaffEvaluationReportPdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
