import { Test, TestingModule } from '@nestjs/testing';
import { BulletPriceService } from './bullet-price.service';

describe('BulletPriceService', () => {
  let service: BulletPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BulletPriceService],
    }).compile();

    service = module.get<BulletPriceService>(BulletPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
