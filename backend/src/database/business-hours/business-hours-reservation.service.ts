import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, IsNull, MoreThan, Repository } from 'typeorm';
import { BusinessHourReservationEntity } from '../entities/business-hour-reservation.entity';
import { DateHelper } from '../../shared/classes/date-helper';

@Injectable()
export class BusinessHoursReservationService {
  constructor(
    @InjectRepository(BusinessHourReservationEntity) private repository: Repository<BusinessHourReservationEntity>,
  ) {}

  public async getById(id: number): Promise<BusinessHourReservationEntity> {
    return this.repository.findOne({
      where: { id: id },
      relations: {
        businessHour: true,
      },
    });
  }

  public async getByOrganization(id: number, year: number): Promise<BusinessHourReservationEntity[]> {
    const timeStart = DateHelper.getYearStart(year).getTime();
    const timeEnd = DateHelper.getYearEnd(year).getTime();

    return this.repository.find({
      where: {
        organizationId: id,
        businessHour: {
          start: Between(timeStart, timeEnd),
        },
      },
      relations: {
        businessHour: true,
      },
      select: {
        owner: {
          id: true,
          userName: true,
          firstName: true,
          lastName: true,
          mobile: true,
          email: true,
          zip: true,
          street: true,
        },
      },
      order: {
        businessHour: {
          start: 'DESC',
        },
      },
    });
  }

  public async getNextByOrganization(id: number): Promise<BusinessHourReservationEntity[]> {
    const start = DateHelper.getDayStart(Date.now());
    return this.repository.find({
      where: {
        organizationId: id,
        businessHour: {
          start: MoreThan(start.getTime()),
        },
      },
      relations: {
        businessHour: true,
      },
      select: {
        owner: {
          id: true,
          userName: true,
          firstName: true,
          lastName: true,
          mobile: true,
          email: true,
          zip: true,
          street: true,
        },
      },
      order: {
        businessHour: {
          start: 'ASC',
        },
      },
    });
  }

  public async getByUserAndYear(id: number, year: number): Promise<BusinessHourReservationEntity[]> {
    const timeStart = DateHelper.getYearStart(year).getTime();
    const timeEnd = DateHelper.getYearEnd(year).getTime();

    return this.repository.find({
      where: {
        ownerId: id,
        organizationId: IsNull(),
        businessHour: {
          start: Between(timeStart, timeEnd),
        },
      },
      relations: {
        businessHour: true,
      },
      select: {
        owner: {
          id: true,
          userName: true,
          firstName: true,
          lastName: true,
          mobile: true,
          email: true,
          zip: true,
          street: true,
        },
      },
      order: {
        businessHour: {
          start: 'DESC',
        },
      },
    });
  }

  public async getByUser(id: number): Promise<BusinessHourReservationEntity[]> {
    return this.repository.find({
      where: {
        ownerId: id,
        organizationId: IsNull(),
      },
      relations: {
        businessHour: true,
      },
      order: {
        businessHour: {
          start: 'DESC',
        },
      },
    });
  }

  public getByUserAndBusinessHour(userId: number, businessHourId: number): Promise<BusinessHourReservationEntity[]> {
    return this.repository.find({
      where: {
        ownerId: userId,
        organizationId: IsNull(),
        businessHour: {
          id: businessHourId,
        },
      },
      relations: {
        businessHour: true,
      },
      select: {
        owner: {
          id: true,
          userName: true,
          firstName: true,
          lastName: true,
          mobile: true,
          email: true,
          zip: true,
          street: true,
        },
      },
      order: {
        businessHour: {
          start: 'DESC',
        },
      },
    });
  }

  public async getNextByUser(id: number): Promise<BusinessHourReservationEntity[]> {
    const start = DateHelper.getDayStart(Date.now());
    return this.repository.find({
      where: {
        ownerId: id,
        organizationId: IsNull(),
        businessHour: {
          start: MoreThan(start.getTime()),
        },
      },
      relations: {
        businessHour: true,
      },
      select: {
        owner: {
          id: true,
          userName: true,
          firstName: true,
          lastName: true,
          mobile: true,
          email: true,
          zip: true,
          street: true,
        },
      },
      order: {
        businessHour: {
          start: 'ASC',
        },
      },
    });
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

  public async deleteByOwnerId(id: number): Promise<void> {
    await this.repository.delete({
      ownerId: id,
    });
  }

  public async deleteByBusinessHours(businessHourId: number): Promise<any> {
    return await this.repository.delete({ businessHourId: businessHourId });
  }

  public async deleteByOrganization(organizationId: number): Promise<any> {
    return await this.repository.delete({ organizationId: organizationId });
  }
}
