import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationEntity } from '../entities/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationReceiverEntity } from '../entities/notification-receiver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity, NotificationReceiverEntity])],
  providers: [NotificationService],
  controllers: [],
  exports: [NotificationService],
})
export class NotificationModule {}
