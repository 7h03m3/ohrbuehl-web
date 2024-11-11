import { Test, TestingModule } from '@nestjs/testing';
import { AccountingItemsOverviewPdfService } from './accounting-items-overview-pdf.service';

describe('AccountingItemsOverviewPdfService', () => {
  let service: AccountingItemsOverviewPdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountingItemsOverviewPdfService],
    }).compile();

    service = module.get<AccountingItemsOverviewPdfService>(AccountingItemsOverviewPdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
