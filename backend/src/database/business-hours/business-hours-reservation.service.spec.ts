import { Test, TestingModule } from '@nestjs/testing';
import { BusinessHoursReservationService } from './business-hours-reservation.service';

describe('BusinessHoursReservationService', () => {
  let service: BusinessHoursReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessHoursReservationService],
    }).compile();

    service = module.get<BusinessHoursReservationService>(BusinessHoursReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
