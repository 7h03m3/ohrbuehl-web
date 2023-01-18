import { Test, TestingModule } from '@nestjs/testing';
import { EventOrganizationReportPdfService } from './event-organization-report-pdf.service';

describe('EventOrganizationReportPdfService', () => {
  let service: EventOrganizationReportPdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventOrganizationReportPdfService],
    }).compile();

    service = module.get<EventOrganizationReportPdfService>(EventOrganizationReportPdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
