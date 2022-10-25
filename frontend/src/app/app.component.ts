import {Component} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Role} from "./shared/enums/role.enum";

import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private authService: AuthService, private router: Router) {
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public isAdmin(): boolean {
    return (this.getUserRole() == Role.Admin);
  }


  public getUserRole(): Role {
    return this.authService.getRole();
  }

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
