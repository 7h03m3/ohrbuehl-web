import { Test, TestingModule } from '@nestjs/testing';
import { EventsStaffPoolController } from './events-staff-pool.controller';

describe('EventsStaffPoolController', () => {
  let controller: EventsStaffPoolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsStaffPoolController],
    }).compile();

    controller = module.get<EventsStaffPoolController>(EventsStaffPoolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
