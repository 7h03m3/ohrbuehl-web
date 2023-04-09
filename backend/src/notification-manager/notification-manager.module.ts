import { Module } from '@nestjs/common';
import { NotificationManagerService } from './notification-manager.service';
import { NotificationModule } from '../database/notification/notification.module';
import { MailModule } from '../mail/mail.module';

@Module({
  providers: [NotificationManagerService],
  imports: [NotificationModule, MailModule],
  exports: [NotificationManagerService],
})
export class NotificationManagerModule {}
