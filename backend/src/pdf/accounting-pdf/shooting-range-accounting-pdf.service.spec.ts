import { Test, TestingModule } from '@nestjs/testing';
import { ShootingRangeAccountingPdfService } from './shooting-range-accounting-pdf.service';

describe('ShootingRangeAccountingPdfService', () => {
  let service: ShootingRangeAccountingPdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShootingRangeAccountingPdfService],
    }).compile();

    service = module.get<ShootingRangeAccountingPdfService>(ShootingRangeAccountingPdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
