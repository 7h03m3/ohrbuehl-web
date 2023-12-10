import { Test, TestingModule } from '@nestjs/testing';
import { BusinessHourDayPdfService } from './business-hour-day-pdf.service';

describe('BusinessHourDayPdfService', () => {
  let service: BusinessHourDayPdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessHourDayPdfService],
    }).compile();

    service = module.get<BusinessHourDayPdfService>(BusinessHourDayPdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
