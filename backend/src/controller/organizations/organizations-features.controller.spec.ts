import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsFeaturesController } from './organizations-features.controller';

describe('OrganizationsFeaturesController', () => {
  let controller: OrganizationsFeaturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationsFeaturesController],
    }).compile();

    controller = module.get<OrganizationsFeaturesController>(OrganizationsFeaturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
