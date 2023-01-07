import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationMemberDto } from '../../../shared/dtos/organization-member.dto';
import { OrganizationMemberApi } from '../../../api/classes/organization-member-api';
import { ApiService } from '../../../api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrganizationApi } from '../../../api/classes/organization-api';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { StringHelper } from '../../../shared/classes/string-helper';

@Component({
  selector: 'app-organization-member-list',
  templateUrl: './organization-member-list.component.html',
  styleUrls: ['./organization-member-list.component.css'],
})
export class OrganizationMemberListComponent {
  memberList$ = new Observable<OrganizationMemberDto[]>();
  displayedColumns: string[] = ['firstname', 'lastname', 'birthdate', 'vvaId', 'action'];

  private organizationId = 0;
  private organizationApi: OrganizationApi;
  private memberApi: OrganizationMemberApi;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router,
    private userData: UserLocalData,
    public stringHelper: StringHelper,
  ) {
    this.organizationApi = this.apiService.getOrganization();
    this.memberApi = this.apiService.getOrganizationMember();
  }

  public ngOnInit(): void {
    this.organizationApi.getByManagerId(this.userData.getUserId()).subscribe((response) => {
      this.organizationId = response.id;
      this.fetch();
    });
  }

  public onDelete(element: OrganizationMemberDto) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: { itemName: element.firstName + ' ' + element.lastName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.memberApi.delete(element.id).subscribe((data) => this.fetch());
      }
    });
  }

  public onCreate() {
    this.router.navigate(['/organization-manager/member-edit', { organizationId: this.organizationId }]);
  }

  public onEdit(element: OrganizationMemberDto) {
    this.router.navigate([
      '/organization-manager/member-edit',
      {
        id: element.id,
        organizationId: this.organizationId,
      },
    ]);
  }

  private fetch() {
    this.memberList$ = this.memberApi.getAllByOrganization(this.organizationId);
  }
}
