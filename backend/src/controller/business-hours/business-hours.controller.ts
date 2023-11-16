import { Controller, Get } from '@nestjs/common';
import { BusinessHoursHelperService } from './helpers/business-hours-helper.service';
import { BusinessHourEntity } from '../../database/entities/business-hour.entity';

@Controller('business-hours/')
export class BusinessHoursController {
  constructor(private businessHours: BusinessHoursHelperService) {}

  @Get()
  public async getAllNextPublic(): Promise<BusinessHourEntity[]> {
    return this.businessHours.getAllNextPublic();
  }
}
