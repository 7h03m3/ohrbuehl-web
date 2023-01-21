import { Test, TestingModule } from '@nestjs/testing';
import { EventOrganizationStaffReportPdfService } from './event-organization-staff-report-pdf.service';

describe('EventOrganizationStaffReportPdfService', () => {
  let service: EventOrganizationStaffReportPdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventOrganizationStaffReportPdfService],
    }).compile();

    service = module.get<EventOrganizationStaffReportPdfService>(EventOrganizationStaffReportPdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
