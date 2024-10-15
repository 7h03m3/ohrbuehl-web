import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ApplicationsService } from '../database/applications/applications.service';
import { ApplicationFilesService } from '../database/applications/application-files.service';
import { NotificationManagerService } from '../notification-manager/notification-manager.service';

@Injectable()
export class CleanupService {
  private logger = new Logger('CleanupService');

  constructor(
    private applicationService: ApplicationsService,
    private fileService: ApplicationFilesService,
    private notificationService: NotificationManagerService,
  ) {}

  @Cron('0 0 1 * * *') // every day at 01:00
  public async poll() {
    this.logger.log('poll');
    const expired = await this.applicationService.getAllExpired();
    if (expired.length != 0) {
      for (const application of expired) {
        await this.fileService.deleteAll(application);
        await this.applicationService.delete(application);
        this.logger.log(
          'application of ' +
            application.firstname +
            ' ' +
            application.lastname +
            ' (id:' +
            application.id +
            ') deleted ',
        );
        await this.notificationService.deleteApplication(application);
      }
    }
  }
}
