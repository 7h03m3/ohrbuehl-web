import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { BusinessHourEntity } from '../entities/business-hour.entity';
import { DateHelper } from '../../shared/classes/date-helper';

@Injectable()
export class BusinessHoursService {
  constructor(@InjectRepository(BusinessHourEntity) private repository: Repository<BusinessHourEntity>) {}

  public getAllDatesOfYear(year: number): Promise<BusinessHourEntity[]> {
    const timeStart = DateHelper.getYearStart(year).getTime();
    const timeEnd = DateHelper.getYearEnd(year).getTime();

    return this.repository.find({
      where: {
        start: Between(timeStart, timeEnd),
      },
      order: {
        start: 'DESC',
      },
      select: {
        start: true,
      },
    });
  }

  public getAllOfYear(year: number): Promise<BusinessHourEntity[]> {
    const timeStart = DateHelper.getYearStart(year).getTime();
    const timeEnd = DateHelper.getYearEnd(year).getTime();

    return this.repository.find({
      where: {
        start: Between(timeStart, timeEnd),
      },
      order: {
        start: 'DESC',
      },
    });
  }

  public getAllOfDay(time: number): Promise<BusinessHourEntity[]> {
    const timeStart = DateHelper.getDayStart(time).getTime();
    const timeEnd = DateHelper.getDayEnd(time).getTime();

    return this.repository.find({
      where: {
        start: Between(timeStart, timeEnd),
      },
      order: {
        start: 'DESC',
        reservations: {
          facilityType: 'ASC',
        },
      },
      relations: {
        reservations: {
          owner: true,
          organization: true,
        },
      },
      select: {
        reservations: {
          id: true,
          locked: true,
          count: true,
          ownerId: true,
          comment: true,
          eventType: true,
          facilityType: true,
          organizationId: true,
          owner: {
            firstName: true,
            lastName: true,
            userName: true,
            id: true,
          },
        },
      },
    });
  }

  public getById(id: number): Promise<BusinessHourEntity> {
    return this.repository.findOne({
      where: { id: id },
      relations: {
        reservations: {
          owner: true,
          organization: true,
        },
      },
      select: {
        reservations: {
          id: true,
          locked: true,
          count: true,
          ownerId: true,
          comment: true,
          eventType: true,
          facilityType: true,
          organizationId: true,
          owner: {
            firstName: true,
            lastName: true,
            userName: true,
            id: true,
          },
        },
      },
    });
  }

  public async create(entity: BusinessHourEntity): Promise<BusinessHourEntity> {
    await this.repository.save(entity);
    return entity;
  }

  public async update(entity: BusinessHourEntity): Promise<BusinessHourEntity> {
    await this.repository.save(entity);
    return entity;
  }

  public async deleteById(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
