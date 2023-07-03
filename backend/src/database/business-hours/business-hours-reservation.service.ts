import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessHourReservationEntity } from '../entities/business-hour-reservation.entity';

@Injectable()
export class BusinessHoursReservationService {
  constructor(
    @InjectRepository(BusinessHourReservationEntity) private repository: Repository<BusinessHourReservationEntity>,
  ) {}
}
