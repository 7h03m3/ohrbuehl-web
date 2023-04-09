import { Injectable } from '@nestjs/common';
import { NotificationEntity } from '../entities/notification.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationReceiverEntity } from '../entities/notification-receiver.entity';
import { NotificationReceiverDto } from '../../shared/dtos/notification-receiver.dto';
import { NotificationSource } from '../../shared/enums/notification-source.enum';
import { NotificationAction } from '../../shared/enums/notification-action.enum';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
    @InjectRepository(NotificationReceiverEntity)
    private receiverRepository: Repository<NotificationReceiverEntity>,
  ) {}

  public getAllOlderThan(time: number): Promise<NotificationEntity[]> {
    return this.notificationRepository.find({
      order: { source: 'ASC' },
      where: { time: LessThanOrEqual(time) },
    });
  }

  public async deleteAllOlderThan(time: number): Promise<void> {
    await this.notificationRepository.delete({ time: LessThanOrEqual(time) });
  }

  public async create(
    source: NotificationSource,
    action: NotificationAction,
    targetId: number,
    comment: string,
  ): Promise<NotificationEntity> {
    const entity = new NotificationEntity();

    entity.time = Date.now();
    entity.source = source;
    entity.targetId = targetId;
    entity.action = action;
    entity.comment = comment;

    await this.notificationRepository.save(entity);

    return entity;
  }

  public getAllReceiver(): Promise<NotificationReceiverEntity[]> {
    return this.receiverRepository.find();
  }

  public async createReceiver(dto: NotificationReceiverDto): Promise<NotificationReceiverEntity> {
    const entity = new NotificationReceiverEntity();
    dto.id = 0;
    entity.loadFromDto(dto);

    await this.receiverRepository.save(entity);

    return entity;
  }

  public async updateReceiver(dto: NotificationReceiverDto): Promise<any> {
    const entity = new NotificationReceiverEntity();
    entity.loadFromDto(dto);

    return this.receiverRepository.update({ id: dto.id }, entity);
  }

  public async deleteReceiver(id: number): Promise<void> {
    await this.receiverRepository.delete(id);
  }
}
