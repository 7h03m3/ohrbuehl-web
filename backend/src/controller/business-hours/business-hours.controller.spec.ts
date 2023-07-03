import { Test, TestingModule } from '@nestjs/testing';
import { BusinessHoursController } from './business-hours.controller';

describe('BusinessHoursController', () => {
  let controller: BusinessHoursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessHoursController],
    }).compile();

    controller = module.get<BusinessHoursController>(BusinessHoursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
