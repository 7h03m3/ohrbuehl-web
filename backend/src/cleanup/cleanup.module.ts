import { Module } from '@nestjs/common';
import { CleanupService } from './cleanup.service';
import { ApplicationsModule } from '../database/applications/applications.module';
import { NotificationManagerModule } from '../notification-manager/notification-manager.module';

@Module({
  providers: [CleanupService],
  imports: [ApplicationsModule, NotificationManagerModule],
})
export class CleanupModule {}
