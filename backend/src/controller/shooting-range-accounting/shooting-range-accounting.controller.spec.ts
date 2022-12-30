import { Test, TestingModule } from '@nestjs/testing';
import { ShootingRangeAccountingController } from './shooting-range-accounting.controller';

describe('ShootingRangeAccountingController', () => {
  let controller: ShootingRangeAccountingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShootingRangeAccountingController],
    }).compile();

    controller = module.get<ShootingRangeAccountingController>(ShootingRangeAccountingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
