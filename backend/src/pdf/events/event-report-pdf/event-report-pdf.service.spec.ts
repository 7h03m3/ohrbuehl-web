import { Test, TestingModule } from '@nestjs/testing';
import { EventReportPdfService } from './event-report-pdf.service';

describe('EventReportPdfService', () => {
  let service: EventReportPdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventReportPdfService],
    }).compile();

    service = module.get<EventReportPdfService>(EventReportPdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
