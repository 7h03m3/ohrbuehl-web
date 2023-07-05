import { Controller, Get } from '@nestjs/common';
import { BusinessHoursService } from '../../database/business-hours/business-hours.service';
import { BusinessHoursReservationService } from '../../database/business-hours/business-hours-reservation.service';
import { BusinessHoursConfigService } from './helpers/business-hours-config.service';
import { BusinessHourEntity } from '../../database/entities/business-hour.entity';

@Controller('business-hours/')
export class BusinessHoursController {
  constructor(
    private businessHoursService: BusinessHoursService,
    private reservationService: BusinessHoursReservationService,
    private config: BusinessHoursConfigService,
  ) {}

  @Get()
  public async getAll(): Promise<BusinessHourEntity[]> {
    return this.businessHoursService.getAll();
  }
}
