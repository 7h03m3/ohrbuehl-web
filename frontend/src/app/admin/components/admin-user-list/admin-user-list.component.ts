import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../api/api.service";
import {AdminUserDeleteDialogComponent} from "../admin-user-delete-dialog/admin-user-delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UserLocalData} from "../../../shared/classes/user-local-data";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {
  userList$: any;
  displayedColumns: string[] = ['id', 'username', 'firstname', 'lastname', 'role', 'action'];

  constructor(private apiService: ApiService, public dialog: MatDialog, private userLocalData: UserLocalData, private router: Router) {
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.userList$ = this.apiService.getAllUser();
  }

  deleteUser(id: string, firstName: string, lastName: string) {
    let dialogRef = this.dialog.open(AdminUserDeleteDialogComponent, {
      data: {
        firstName: firstName,
        lastName: lastName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.deleteUser(id).subscribe(data => this.fetch());
      }
    })
  }

  editUser(id: number) {
    this.router.navigate(['/admin/user-edit', {id: id}]);
  }

  public getRoleText(role: string): string {
    return this.userLocalData.convertRoleText(role);
  }
}
