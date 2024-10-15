import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, LessThan, Not, Repository } from 'typeorm';
import { ApplicationEntity } from '../entities/application.entity';
import * as crypto from 'node:crypto';
import { ApplicationState } from '../../shared/enums/appliaction-state.enum';

@Injectable()
export class ApplicationsService {
  private static ExpirationOffsetTime = 7 * 24 * 60 * 60 * 1000; // 7d
  constructor(@InjectRepository(ApplicationEntity) private repository: Repository<ApplicationEntity>) {}

  public static getExpirationDate() {
    const date = new Date(Date.now() + ApplicationsService.ExpirationOffsetTime);
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    return date.getTime();
  }

  public async getAll(): Promise<ApplicationEntity[]> {
    return this.repository.find();
  }

  public async getAllExpired(): Promise<ApplicationEntity[]> {
    const now = new Date();
    return this.repository.find({
      where: [
        {
          state: ApplicationState.Rejected,
          dates: {
            expiration: LessThan(now.getTime()),
          },
        },
        {
          state: ApplicationState.Open,
          dates: {
            expiration: LessThan(now.getTime()),
          },
        },
      ],
    });
  }

  public async getByName(firstname: string, lastname: string): Promise<ApplicationEntity> {
    return this.repository.findOne({
      where: {
        firstname: firstname,
        lastname: lastname,
      },
    });
  }

  public async getById(id: number): Promise<ApplicationEntity> {
    return this.repository.findOne({ where: { id: id } });
  }

  public async getByRequestId(requestId: string): Promise<ApplicationEntity> {
    return this.repository.findOne({ where: { requestId: requestId }, relations: { files: true } });
  }

  public async create(entity: ApplicationEntity): Promise<ApplicationEntity> {
    entity.requestId = this.getRequestId();

    return this.repository.save(entity);
  }

  public async update(entity: ApplicationEntity): Promise<ApplicationEntity> {
    return this.repository.save(entity);
  }

  public async countNotAccepted(): Promise<number> {
    return this.repository.count({
      where: {
        state: Not(ApplicationState.Accepted),
      },
    });
  }

  public async delete(entity: ApplicationEntity): Promise<DeleteResult> {
    return this.repository.delete(entity.id);
  }

  private getRequestId(): string {
    return crypto.randomBytes(20).toString('hex');
  }
}
