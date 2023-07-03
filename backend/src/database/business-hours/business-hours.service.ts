import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessHourEntity } from '../entities/business-hour.entity';

@Injectable()
export class BusinessHoursService {
  constructor(@InjectRepository(BusinessHourEntity) private repository: Repository<BusinessHourEntity>) {}
}
