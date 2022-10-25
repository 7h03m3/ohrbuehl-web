import { Test, TestingModule } from '@nestjs/testing';
import { BulletPricesController } from './bullet-prices.controller';

describe('BulletPricesController', () => {
  let controller: BulletPricesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BulletPricesController],
    }).compile();

    controller = module.get<BulletPricesController>(BulletPricesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
