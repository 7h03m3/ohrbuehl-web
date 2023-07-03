import { Module } from '@nestjs/common';
import { BusinessHoursService } from './business-hours.service';
import { BusinessHoursReservationService } from './business-hours-reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessHourEntity } from '../entities/business-hour.entity';
import { BusinessHourReservationEntity } from '../entities/business-hour-reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessHourEntity, BusinessHourReservationEntity])],
  providers: [BusinessHoursService, BusinessHoursReservationService],
  exports: [BusinessHoursService, BusinessHoursReservationService],
})
export class BusinessHoursModule {}
