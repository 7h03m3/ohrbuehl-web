import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { UserApi } from '../../../api/user-api';
import { MatDialog } from '@angular/material/dialog';
import { UserAccountInformationEditDialogComponent } from '../user-account-information-edit-dialog/user-account-information-edit-dialog.component';
import { UserDto } from '../../../shared/dtos/user.dto';

export interface AccountInformation {
  label: string;
  value: string;
}

@Component({
  selector: 'app-user-account-information',
  templateUrl: './user-account-information.component.html',
  styleUrls: ['./user-account-information.component.css'],
})
export class UserAccountInformationComponent implements OnInit {
  public accountInformation = new Array<AccountInformation>();
  public username = '';
  private user = new UserDto();

  constructor(private authService: AuthService, private userApi: UserApi, private dialog: MatDialog) {}

  public ngOnInit() {
    this.fetch();
  }

  public onEdit() {
    const dialogRef = this.dialog.open(UserAccountInformationEditDialogComponent, {
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data != undefined) {
        this.userApi.updateAccountInformation(this.user).subscribe(() => {
          this.fetch();
        });
      } else {
        this.fetch();
      }
    });
  }

  public fetch() {
    const userId = this.authService.getUserId();

    if (userId != 0) {
      this.userApi.getById(userId).subscribe((response) => {
        this.user = response;
        this.username = response.userName;
        this.accountInformation = new Array<AccountInformation>();
        this.accountInformation.push({ label: 'Vorname', value: response.firstName });
        this.accountInformation.push({ label: 'Nachname', value: response.lastName });
        this.accountInformation.push({ label: 'Telefonnummer', value: response.mobile });
        this.accountInformation.push({ label: 'E-Mail Adresse', value: response.email });
        this.accountInformation.push({ label: 'Strasse', value: response.street });
        this.accountInformation.push({ label: 'Ort', value: response.zip + ' ' + response.location });
      });
    }
  }
}
