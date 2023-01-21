import { Test, TestingModule } from '@nestjs/testing';
import { EventsShiftController } from './events-shift.controller';

describe('EventsShiftController', () => {
  let controller: EventsShiftController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsShiftController],
    }).compile();

    controller = module.get<EventsShiftController>(EventsShiftController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
