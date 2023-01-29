import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { UserPasswordChangeDto } from '../../../shared/dtos/user-password-change.dto';
import { ApiService } from '../../../api/api.service';
import { catchError, EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrls: ['./user-password-change.component.css'],
})
export class UserPasswordChangeComponent {
  public oldPassword = '';
  public newPassword = '';
  public newPasswordConfirm = '';
  public hidePassword = true;
  public passwordMatch = false;
  public disableSubmitButton = false;
  public changeFailed = false;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  public ngOnInit() {
    this.disableSubmitButton = false;
  }

  public onSubmit() {
    this.disableSubmitButton = true;

    const dto = new UserPasswordChangeDto();
    dto.userId = this.authService.getUserId();
    dto.oldPassword = this.oldPassword;
    dto.newPassword = this.newPassword;

    this.apiService
      .changePassword(dto)
      .pipe(
        catchError((err) => {
          this.changeFailed = true;
          return EMPTY;
        }),
      )
      .subscribe((data) => {
        this.openSnackBar('Passwort wurde geändert');
      });
  }

  public onInputChange() {
    this.changeFailed = false;
    this.disableSubmitButton = false;
    this.passwordMatch = this.newPassword == this.newPasswordConfirm && this.newPassword != this.oldPassword;
  }

  private openSnackBar(message: string, redirect = true) {
    const ref = this.snackBar.open(message, 'Verbergen', {
      duration: 3000,
      verticalPosition: 'bottom',
    });

    if (redirect) {
      ref.afterDismissed().subscribe((data) => {
        this.router.navigate(['/']);
      });
    }
  }
}
