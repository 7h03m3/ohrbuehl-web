import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

import { Router } from '@angular/router';
import { UserLocalData } from './shared/classes/user-local-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router, private userLocalData: UserLocalData) {}

  public getRoleText(): string {
    return this.userLocalData.convertRoleText(this.authService.getRole());
  }

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  public onEventSelect(category: string | undefined) {
    if (category) {
      this.router.navigate(['/public/event-list', { category: category }]);
    } else {
      this.router.navigate(['/public/event-list']);
    }
  }
}
