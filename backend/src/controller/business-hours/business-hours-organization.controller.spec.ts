import { Test, TestingModule } from '@nestjs/testing';
import { BusinessHoursOrganizationController } from './business-hours-organization.controller';

describe('BusinessHoursOrganizationController', () => {
  let controller: BusinessHoursOrganizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessHoursOrganizationController],
    }).compile();

    controller = module.get<BusinessHoursOrganizationController>(BusinessHoursOrganizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
