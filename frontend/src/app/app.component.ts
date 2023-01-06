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
  title = 'frontend';

  constructor(public authService: AuthService, private router: Router, private userLocalData: UserLocalData) {}

  public getRoleText(): string {
    return this.userLocalData.convertRoleText(this.authService.getRole());
  }

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
