import { Test, TestingModule } from '@nestjs/testing';
import { EventsShiftService } from './events-shift.service';

describe('EventsShiftService', () => {
  let service: EventsShiftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsShiftService],
    }).compile();

    service = module.get<EventsShiftService>(EventsShiftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
