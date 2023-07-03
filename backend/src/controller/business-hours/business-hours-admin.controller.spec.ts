import { Test, TestingModule } from '@nestjs/testing';
import { BusinessHoursAdminController } from './business-hours-admin.controller';

describe('BusinessHoursAdminController', () => {
  let controller: BusinessHoursAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessHoursAdminController],
    }).compile();

    controller = module.get<BusinessHoursAdminController>(BusinessHoursAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
