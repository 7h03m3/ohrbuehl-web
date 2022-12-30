import { Test, TestingModule } from '@nestjs/testing';
import { ShootingRangePricesController } from './shooting-range-prices.controller';

describe('BulletPricesController', () => {
  let controller: ShootingRangePricesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShootingRangePricesController],
    }).compile();

    controller = module.get<ShootingRangePricesController>(ShootingRangePricesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
