import { Test, TestingModule } from '@nestjs/testing';
import { EventsStaffPoolService } from './events-staff-pool.service';

describe('EventsStaffPoolService', () => {
  let service: EventsStaffPoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsStaffPoolService],
    }).compile();

    service = module.get<EventsStaffPoolService>(EventsStaffPoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
