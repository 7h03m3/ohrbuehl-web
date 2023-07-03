import { Test, TestingModule } from '@nestjs/testing';
import { BusinessHoursSingleController } from './business-hours-single.controller';

describe('BusinessHoursSingleController', () => {
  let controller: BusinessHoursSingleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessHoursSingleController],
    }).compile();

    controller = module.get<BusinessHoursSingleController>(BusinessHoursSingleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
