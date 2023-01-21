import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsMemberController } from './organizations-member.controller';

describe('OrganizationsMemberController', () => {
  let controller: OrganizationsMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationsMemberController],
    }).compile();

    controller = module.get<OrganizationsMemberController>(OrganizationsMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
