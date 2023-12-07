import { Injectable } from '@angular/core';
import { ContactMessageStatus } from '../enums/contact-message-status.enum';
import { AuthService } from '../../auth/auth.service';
import { ContactMessageApi } from '../../api/contact-message-api';

@Injectable({
  providedIn: 'root',
})
export class ContactMessageService {
  private messageCount = 0;

  constructor(public authService: AuthService, private contactMessageApi: ContactMessageApi) {}

  public update() {
    if (this.authService.isShootingRangeManager()) {
      this.contactMessageApi.getStatusCount(ContactMessageStatus.Open).subscribe((response) => {
        this.messageCount = +response;
      });
    }
  }

  public getMessageCount(): number {
    return this.messageCount;
  }
}
