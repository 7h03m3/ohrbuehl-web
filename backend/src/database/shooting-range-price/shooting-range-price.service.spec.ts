import { Test, TestingModule } from '@nestjs/testing';
import { ShootingRangePriceService } from './shooting-range-price.service';

describe('BulletPriceService', () => {
  let service: ShootingRangePriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShootingRangePriceService],
    }).compile();

    service = module.get<ShootingRangePriceService>(ShootingRangePriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
