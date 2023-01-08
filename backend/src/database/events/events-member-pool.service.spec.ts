import { Test, TestingModule } from '@nestjs/testing';
import { EventsMemberPoolService } from './events-member-pool.service';

describe('EventsMemberPoolService', () => {
  let service: EventsMemberPoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsMemberPoolService],
    }).compile();

    service = module.get<EventsMemberPoolService>(EventsMemberPoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
