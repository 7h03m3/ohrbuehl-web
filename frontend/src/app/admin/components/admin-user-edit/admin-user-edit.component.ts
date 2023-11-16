import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api/api.service';
import { Role } from '../../../shared/enums/role.enum';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserApi } from '../../../api/classes/user-api';
import { UserDto } from '../../../shared/dtos/user.dto';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { OrganizationApi } from '../../../api/classes/organization-api';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css'],
})
export class AdminUserEditComponent implements OnInit {
  public formValid = true;
  public hidePassword = true;
  public user: UserDto = new UserDto();
  public userRoles = Object.values(Role);
  public organizationList = new Array<OrganizationDto>();
  public disableOrganization = true;
  private userApi: UserApi;
  private organizationApi: OrganizationApi;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private userLocalData: UserLocalData,
    private snackBar: MatSnackBar,
  ) {
    this.userApi = this.apiService.getUser();
    this.organizationApi = this.apiService.getOrganization();
  }

  public ngOnInit(): void {
    this.organizationApi.getAll().subscribe((response) => {
      this.organizationList = new Array<OrganizationDto>();

      response.forEach((organization) => {
        this.organizationList.push(organization);
      });
    });

    this.route.paramMap.subscribe((data) => {
      const idString = data.get('id');

      if (idString != undefined) {
        this.user.id = Number(idString);
        this.userApi.getById(this.user.id).subscribe((data) => {
          this.user = data;
          this.user.password = '';

          if (data.assignedOrganizationId != undefined) {
            this.user.assignedOrganizationId = data.assignedOrganizationId;
          } else {
            this.user.assignedOrganizationId = 0;
          }

          this.updateDisableOrganization(this.user.roles);
        });
      } else {
        this.user = new UserDto();
      }
    });
  }

  public onRoleChange(newValue: string) {
    this.updateDisableOrganization(newValue as Role);
  }

  public onSubmit(): void {
    if (this.user.id == 0) {
      this.userApi.create(this.user).subscribe(() => {
        this.openSnackBar(this.user.firstName + ' ' + this.user.lastName + ' wurde erstellt');
        this.user = new UserDto();
      });
    } else {
      this.userApi.update(this.user).subscribe((data) => {
        this.openSnackBar(this.user.firstName + ' ' + this.user.lastName + ' gespeichert');
        this.user = new UserDto();
      });
    }
  }

  public getRoleText(role: string): string {
    return UserLocalData.convertRoleText(role);
  }

  private updateDisableOrganization(role: Role) {
    this.disableOrganization = role != Role.OrganizationManager;

    if (this.disableOrganization) {
      this.user.assignedOrganizationId = 0;
    }
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
