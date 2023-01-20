import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationMemberDto } from '../../../shared/dtos/organization-member.dto';
import { OrganizationMemberApi } from '../../../api/classes/organization-member-api';
import { ApiService } from '../../../api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrganizationApi } from '../../../api/classes/organization-api';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { StringHelper } from '../../../shared/classes/string-helper';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-organization-member-list',
  templateUrl: './organization-member-list.component.html',
  styleUrls: ['./organization-member-list.component.css'],
})
export class OrganizationMemberListComponent {
  memberList$ = new Observable<OrganizationMemberDto[]>();
  displayedColumns: string[] = ['firstname', 'lastname', 'birthdate', 'phoneNumber', 'vvaId', 'rangeOfficer', 'action'];

  private organizationId = 0;
  private organizationApi: OrganizationApi;
  private memberApi: OrganizationMemberApi;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    public stringHelper: StringHelper,
  ) {
    this.organizationApi = this.apiService.getOrganization();
    this.memberApi = this.apiService.getOrganizationMember();
  }

  public ngOnInit(): void {
    this.organizationId = this.authService.getManagingOrganizationId();
    this.fetch();
  }

  public onDelete(element: OrganizationMemberDto) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: { itemName: element.firstName + ' ' + element.lastName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.memberApi.delete(element.id).subscribe(() => this.fetch());
      }
    });
  }

  public onCreate() {
    this.router.navigate(['/organization-manager/member-edit']);
  }

  public onEdit(element: OrganizationMemberDto) {
    this.router.navigate([
      '/organization-manager/member-edit',
      {
        id: element.id,
      },
    ]);
  }

  private fetch() {
    this.memberList$ = this.memberApi.getAllByOrganization(this.organizationId);
  }
}
