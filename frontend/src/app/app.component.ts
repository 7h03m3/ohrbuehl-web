import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

import { Router } from '@angular/router';
import { UserLocalData } from './shared/classes/user-local-data';
import { ApiService } from './api/api.service';
import { ContactMessageApi } from './api/classes/contact-message-api';
import { ContactMessageStatus } from './shared/enums/contact-message-status.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public messageCount = 0;
  private contactMessageApi: ContactMessageApi | undefined;

  constructor(public authService: AuthService, private router: Router, private apiService: ApiService) {}

  public ngOnInit() {
    if (this.authService.isShootingRangeManager()) {
      this.contactMessageApi = this.apiService.getContactMessage();
      this.contactMessageApi.getStatusCount(ContactMessageStatus.Open).subscribe((response) => {
        this.messageCount = +response;
      });
    }
  }

  public getRoleText(): string {
    return UserLocalData.convertRoleText(this.authService.getRole());
  }

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/user/login');
  }

  public onEventSelect(category: string | undefined) {
    if (category) {
      this.router.navigate(['/public/event-list', { category: category }]);
    } else {
      this.router.navigate(['/public/event-list']);
    }
  }
}
