import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserEditDto } from '../../../shared/dtos/user-edit.dto';
import { ApiService } from '../../../api/api.service';
import { Role } from '../../../shared/enums/role.enum';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserApi } from '../../../api/classes/user-api';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css'],
})
export class AdminUserEditComponent implements OnInit {
  public formValid = true;
  public hidePassword = true;
  public user: UserEditDto = new UserEditDto();
  public userRoles = Object.values(Role);
  private userApi: UserApi;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private userLocalData: UserLocalData,
    private snackBar: MatSnackBar,
  ) {
    this.userApi = this.apiService.getUser();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      this.user.id = Number(data.get('id'));
      this.user.password = '';
      this.userApi.getById(this.user.id).subscribe((data) => {
        this.user.userName = data.userName;
        this.user.firstName = data.firstName;
        this.user.lastName = data.lastName;
        this.user.roles = data.roles;
      });
    });
  }

  onSubmit(): void {
    this.userApi.update(this.user).subscribe((data) => {
      this.openSnackBar(this.user.firstName + ' ' + this.user.lastName + ' gespeichert');
    });
  }

  public getRoleText(role: string): string {
    return this.userLocalData.convertRoleText(role);
  }

  private openSnackBar(message: string) {
    const ref = this.snackBar.open(message, 'Verbergen', {
      duration: 3000,
      verticalPosition: 'bottom',
    });

    ref.afterDismissed().subscribe((data) => {
      this.router.navigate(['/admin']);
    });
  }
}
