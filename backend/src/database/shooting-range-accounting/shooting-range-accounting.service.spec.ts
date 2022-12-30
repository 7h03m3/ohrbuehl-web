import { Test, TestingModule } from '@nestjs/testing';
import { ShootingRangeAccountingService } from './shooting-range-accounting.service';

describe('ShootingRangeAccountingService', () => {
  let service: ShootingRangeAccountingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShootingRangeAccountingService],
    }).compile();

    service = module.get<ShootingRangeAccountingService>(ShootingRangeAccountingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
