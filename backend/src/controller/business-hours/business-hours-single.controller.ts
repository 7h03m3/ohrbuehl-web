import { Controller } from '@nestjs/common';
import { BusinessHoursService } from '../../database/business-hours/business-hours.service';
import { BusinessHoursReservationService } from '../../database/business-hours/business-hours-reservation.service';
import { BusinessHoursConfigService } from './helpers/business-hours-config.service';

@Controller('business-hours/single/')
export class BusinessHoursSingleController {
  constructor(
    private businessHoursService: BusinessHoursService,
    private reservationService: BusinessHoursReservationService,
    private config: BusinessHoursConfigService,
  ) {}
}
