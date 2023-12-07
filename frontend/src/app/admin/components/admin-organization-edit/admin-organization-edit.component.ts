import { Component, OnInit } from '@angular/core';
import { Role } from '../../../shared/enums/role.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { OrganizationApi } from '../../../api/organization-api';
import { UserDto } from '../../../shared/dtos/user.dto';
import { UserApi } from '../../../api/user-api';

@Component({
  selector: 'app-admin-organization-edit',
  templateUrl: './admin-organization-edit.component.html',
  styleUrls: ['./admin-organization-edit.component.css'],
})
export class AdminOrganizationEditComponent implements OnInit {
  public formValid = true;
  public organization: OrganizationDto = new OrganizationDto();
  public userList: UserDto[] = new Array<UserDto>();
  public userRoles = Object.values(Role);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private organizationApi: OrganizationApi,
    private userApi: UserApi,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.userApi.getAll().subscribe((response) => {
      const noUser = new UserDto();
      noUser.userName = '-';
      this.userList = new Array<UserDto>();
      this.userList.push(noUser);
      response.forEach((element) => {
        this.userList.push(element);
      });
    });

    this.route.paramMap.subscribe((data) => {
      const idString = data.get('id');

      if (idString != null) {
        this.organization.id = Number(idString);
        this.organizationApi.getDetailById(this.organization.id).subscribe((data) => {
          this.organization = data;
        });
      }
    });
  }

  onSubmit(): void {
    if (this.organization.id == 0) {
      this.organizationApi.create(this.organization).subscribe(() => {
        this.openSnackBar(this.organization.name + ' wurde erstellt');
        this.organization = new OrganizationDto();
      });
    } else {
      this.organizationApi.update(this.organization).subscribe((data) => {
        this.openSnackBar(this.organization.name + ' gespeichert');
        this.organization = new OrganizationDto();
      });
    }
  }

  public getUserName(user: UserDto) {
    if (user.lastName != '' || user.firstName != '') {
      return user.userName + ' (' + user.firstName + ' ' + user.lastName + ')';
    }

    return user.userName;
  }

  private openSnackBar(message: string) {
    const ref = this.snackBar.open(message, 'Verbergen', {
      duration: 3000,
      verticalPosition: 'bottom',
    });

    ref.afterDismissed().subscribe((data) => {
      this.router.navigate(['/admin/organization-list']);
    });
  }
}
