import { Test, TestingModule } from '@nestjs/testing';
import { EventsCategoryController } from './events-category.controller';

describe('EventsCategoryController', () => {
  let controller: EventsCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsCategoryController],
    }).compile();

    controller = module.get<EventsCategoryController>(EventsCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
