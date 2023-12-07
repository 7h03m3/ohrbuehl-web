import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationFeatureService } from './organization-feature.service';

describe('OrganizationFeatureService', () => {
  let service: OrganizationFeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationFeatureService],
    }).compile();

    service = module.get<OrganizationFeatureService>(OrganizationFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
