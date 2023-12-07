import { Test, TestingModule } from '@nestjs/testing';
import { AccountingItemsOrganizationPdfService } from './accounting-items-organization-pdf.service';

describe('AccountingItemsOrganizationPdfService', () => {
  let service: AccountingItemsOrganizationPdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountingItemsOrganizationPdfService],
    }).compile();

    service = module.get<AccountingItemsOrganizationPdfService>(AccountingItemsOrganizationPdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
