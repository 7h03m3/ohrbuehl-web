import { Component, ViewChild } from '@angular/core';
import { OrganizationMemberDto } from '../../../shared/dtos/organization-member.dto';
import { OrganizationMemberApi } from '../../../api/classes/organization-member-api';
import { ApiService } from '../../../api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrganizationApi } from '../../../api/classes/organization-api';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { StringHelper } from '../../../shared/classes/string-helper';
import { AuthService } from '../../../auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InfoDialogComponent } from '../../../shared/components/info-dialog/info-dialog.component';

@Component({
  selector: 'app-organization-member-list',
  templateUrl: './organization-member-list.component.html',
  styleUrls: ['./organization-member-list.component.css'],
})
export class OrganizationMemberListComponent {
  public dataSource = new MatTableDataSource<OrganizationMemberDto>();
  public displayedColumns: string[] = [
    'firstname',
    'lastname',
    'birthdate',
    'phoneNumber',
    'vvaId',
    'rangeOfficer',
    'action',
  ];
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
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

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public isAddressValid(element: OrganizationMemberDto) {
    return element.zip != 0;
  }

  public onShowAddress(element: OrganizationMemberDto) {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        text:
          element.firstName +
          ' ' +
          element.lastName +
          '\n' +
          element.street +
          '\n' +
          element.zip +
          ' ' +
          element.location,
      },
    });
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
    this.memberApi.getAllByOrganization(this.organizationId).subscribe((response) => {
      this.dataSource.data = response;
    });
  }
}
