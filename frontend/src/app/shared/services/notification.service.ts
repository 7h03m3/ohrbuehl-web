import { Injectable } from '@angular/core';
import { ContactMessageStatus } from '../enums/contact-message-status.enum';
import { AuthService } from '../../auth/auth.service';
import { ContactMessageApi } from '../../api/contact-message-api';
import { ApplicationAdminApiService } from '../../api/application-admin-api.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private messageCount = 0;
  private applicationCount = 0;

  constructor(
    public authService: AuthService,
    private contactMessageApi: ContactMessageApi,
    private applicationService: ApplicationAdminApiService,
  ) {}

  public update() {
    if (this.authService.isShootingRangeManager()) {
      this.contactMessageApi.getStatusCount(ContactMessageStatus.Open).subscribe((response) => {
        this.messageCount = +response;
      });
    }

    if (this.authService.isAdmin()) {
      this.applicationService.getCount().subscribe((response) => {
        this.applicationCount = +response;
      });
    }
  }

  public getMessageCount(): number {
    return this.messageCount;
  }

  public getApplicationCount(): number {
    return this.applicationCount;
  }
}
