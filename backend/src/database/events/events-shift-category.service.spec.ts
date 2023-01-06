import { Test, TestingModule } from '@nestjs/testing';
import { EventsShiftCategoryService } from './events-shift-category.service';

describe('EventsShiftCategoryService', () => {
  let service: EventsShiftCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsShiftCategoryService],
    }).compile();

    service = module.get<EventsShiftCategoryService>(EventsShiftCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
