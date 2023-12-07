import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrganizationApi } from '../../../api/organization-api';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-organization-list',
  templateUrl: './admin-organization-list.component.html',
  styleUrls: ['./admin-organization-list.component.css'],
})
export class AdminOrganizationListComponent implements OnInit {
  dataSource = new MatTableDataSource<OrganizationDto>();
  displayedColumns: string[] = [
    'name',
    'abbreviation',
    'vvaId',
    'position',
    'color',
    'native',
    '300m',
    '100m',
    '50m',
    '25m',
    'action',
  ];
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(private organizationApi: OrganizationApi, public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.organizationApi.getAll().subscribe((response) => {
      this.dataSource = new MatTableDataSource<OrganizationDto>(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteOrganization(id: string, name: string) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: { itemName: name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.organizationApi.delete(id).subscribe(() => this.fetch());
      }
    });
  }

  editOrganization(id: number) {
    this.router.navigate(['/admin/organization-edit', { id: id }]);
  }
}
