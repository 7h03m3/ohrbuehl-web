import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminOrganizationDeleteDialogComponent } from '../admin-organization-delete-dialog/admin-organization-delete-dialog.component';
import { OrganizationApi } from '../../../api/classes/organization-api';

@Component({
  selector: 'app-admin-organization-list',
  templateUrl: './admin-organization-list.component.html',
  styleUrls: ['./admin-organization-list.component.css'],
})
export class AdminOrganizationListComponent implements OnInit {
  organizationList$: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'abbreviation',
    'native',
    'color',
    '300m',
    '100m',
    '50m',
    '25m',
    'action',
  ];

  private organizationApi: OrganizationApi;

  constructor(private apiService: ApiService, public dialog: MatDialog, private router: Router) {
    this.organizationApi = this.apiService.getOrganization();
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.organizationList$ = this.organizationApi.getAll();
  }

  deleteOrganization(id: string, name: string) {
    const dialogRef = this.dialog.open(AdminOrganizationDeleteDialogComponent, {
      data: {
        name: name,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.organizationApi.delete(id).subscribe((data) => this.fetch());
      }
    });
  }

  editOrganization(id: number) {
    this.router.navigate(['/admin/organization-edit', { id: id }]);
  }
}
