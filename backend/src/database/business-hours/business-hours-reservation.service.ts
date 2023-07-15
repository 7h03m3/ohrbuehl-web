import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessHourReservationEntity } from '../entities/business-hour-reservation.entity';

@Injectable()
export class BusinessHoursReservationService {
  constructor(
    @InjectRepository(BusinessHourReservationEntity) private repository: Repository<BusinessHourReservationEntity>,
  ) {}

  public async getById(id: number): Promise<BusinessHourReservationEntity> {
    return this.repository.findOne({ where: { id: id } });
  }

  public async add(entity: BusinessHourReservationEntity): Promise<BusinessHourReservationEntity> {
    await this.repository.save(entity);
    return entity;
  }

  public async update(entity: BusinessHourReservationEntity): Promise<BusinessHourReservationEntity> {
    await this.repository.save(entity);
    return entity;
  }

  public async deleteById(id: number): Promise<any> {
    return await this.repository.delete(id);
  }

  public async deleteByBusinessHours(businessHourId: number): Promise<any> {
    return await this.repository.delete({ businessHourId: businessHourId });
  }
}
