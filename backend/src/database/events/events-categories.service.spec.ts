import { Test, TestingModule } from '@nestjs/testing';
import { EventsCategoryService } from './events-category.service';

describe('EventsCategoryService', () => {
  let service: EventsCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsCategoryService],
    }).compile();

    service = module.get<EventsCategoryService>(EventsCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
