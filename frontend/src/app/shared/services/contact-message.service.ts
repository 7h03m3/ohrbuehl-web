import { Injectable } from '@angular/core';
import { ContactMessageStatus } from '../enums/contact-message-status.enum';
import { AuthService } from '../../auth/auth.service';
import { ApiService } from '../../api/api.service';
import { ContactMessageApi } from '../../api/classes/contact-message-api';

@Injectable({
  providedIn: 'root',
})
export class ContactMessageService {
  private messageCount = 0;
  private contactMessageApi: ContactMessageApi | undefined;

  constructor(public authService: AuthService, private apiService: ApiService) {}

  public update() {
    if (this.authService.isShootingRangeManager()) {
      this.contactMessageApi = this.apiService.getContactMessage();
      this.contactMessageApi.getStatusCount(ContactMessageStatus.Open).subscribe((response) => {
        this.messageCount = +response;
      });
    }
  }

  public getMessageCount(): number {
    return this.messageCount;
  }
}
