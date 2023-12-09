import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginValid = true;
  public username = '';
  public password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private recaptchaV3Service: ReCaptchaV3Service,
  ) {}

  public ngOnInit(): void {}

  public async onSubmit() {
    this.loginValid = true;

    this.recaptchaV3Service.execute('login').subscribe({
      next: (token) => {
        if (token) {
          this.doLogin();
        }
      },
      error: (error) => {
        this.loginValid = false;
        console.log('Error trying to verify request (reCaptcha v3): ' + error);
      },
    });
  }

  private doLogin() {
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
