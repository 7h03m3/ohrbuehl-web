import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { AdminUserDeleteDialogComponent } from '../admin-user-delete-dialog/admin-user-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { Router } from '@angular/router';
import { UserApi } from '../../../api/classes/user-api';
import { Observable } from 'rxjs';
import { UserDto } from '../../../shared/dtos/user.dto';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css'],
})
export class AdminUserListComponent implements OnInit {
  userList$ = new Observable<UserDto[]>();
  displayedColumns: string[] = ['id', 'username', 'firstname', 'lastname', 'role', 'assignedOrganization', 'action'];
  private userApi: UserApi;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private userLocalData: UserLocalData,
    private router: Router,
  ) {
    this.userApi = this.apiService.getUser();
  }

  public ngOnInit(): void {
    this.fetch();
  }

  public deleteUser(id: string, firstName: string, lastName: string) {
    const dialogRef = this.dialog.open(AdminUserDeleteDialogComponent, {
      data: {
        firstName: firstName,
        lastName: lastName,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userApi.delete(id).subscribe((data) => this.fetch());
      }
    });
  }

  public editUser(id: number) {
    this.router.navigate(['/admin/user-edit', { id: id }]);
  }

  public getRoleText(role: string): string {
    return this.userLocalData.convertRoleText(role);
  }

  public getAssignedOrganizationText(user: UserDto): string {
    if (user.assignedOrganization != null) {
      return user.assignedOrganization.abbreviation;
    }

    return '';
  }

  private fetch() {
    this.userList$ = this.userApi.getAll();
  }
}
