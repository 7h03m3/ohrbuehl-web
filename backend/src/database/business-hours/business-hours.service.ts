import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessHourEntity } from '../entities/business-hour.entity';

@Injectable()
export class BusinessHoursService {
  constructor(@InjectRepository(BusinessHourEntity) private repository: Repository<BusinessHourEntity>) {}

  public getAll(): Promise<BusinessHourEntity[]> {
    return this.repository.find();
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
