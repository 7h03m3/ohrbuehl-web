import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

import { Router } from '@angular/router';
import { UserLocalData } from './shared/classes/user-local-data';
import { ContactMessageService } from './shared/services/contact-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    public contactMessageService: ContactMessageService,
  ) {}

  public ngOnInit() {
    this.contactMessageService.update();
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
