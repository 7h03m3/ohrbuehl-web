import { Test, TestingModule } from '@nestjs/testing';
import { EventsShiftCategoryController } from './events-shift-category.controller';

describe('EventsShiftCategoryController', () => {
  let controller: EventsShiftCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsShiftCategoryController],
    }).compile();

    controller = module.get<EventsShiftCategoryController>(EventsShiftCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
