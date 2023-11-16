import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginValid = true;
  public username = '';
  public password = '';

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit(): void {}

  public async onSubmit() {
    this.loginValid = true;
    this.authService.login(this.username, this.password).subscribe({
      complete: () => {
        if (this.authService.isLoggedIn() == false) {
          this.loginValid = false;
        } else {
          this.router.navigateByUrl('/');
        }
      },
    });
  }
}
