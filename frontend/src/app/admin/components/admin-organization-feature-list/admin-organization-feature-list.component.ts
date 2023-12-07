import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { OrganizationFeatureApi } from '../../../api/classes/organization-feature-api';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrganizationFeatureDto } from '../../../shared/dtos/organization-feature.dto';
import { MatDialog } from '@angular/material/dialog';
import { AdminOrganizationFeatureDialogComponent } from '../admin-organization-feature-dialog/admin-organization-feature-dialog.component';

@Component({
  selector: 'app-admin-organization-feature-list',
  templateUrl: './admin-organization-feature-list.component.html',
  styleUrls: ['./admin-organization-feature-list.component.css'],
})
export class AdminOrganizationFeatureListComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<OrganizationFeatureDto>();
  public displayedColumns: string[] = ['organization', 'reservations', 'members', 'shiftPlaning', 'action'];
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  private featureApi: OrganizationFeatureApi;

  constructor(private apiService: ApiService, public dialog: MatDialog) {
    this.featureApi = apiService.getOrganizationFeature();
  }

  public ngOnInit() {
    this.loadData();
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onAdd() {
    const newElement = new OrganizationFeatureDto();
    this.openDialog(newElement);
  }

  public async onEdit(element: OrganizationFeatureDto) {
    await new Promise((f) => setTimeout(f, 250));
    this.openDialog(element);
  }

  private openDialog(element: OrganizationFeatureDto) {
    const dialogRef = this.dialog.open(AdminOrganizationFeatureDialogComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id == 0) {
          this.featureApi.create(result).subscribe(() => {
            this.loadData();
          });
        } else {
          this.featureApi.update(result).subscribe(() => {
            this.loadData();
          });
        }
      }
    });
  }

  private loadData() {
    this.featureApi.getAll().subscribe((response) => {
      this.dataSource.data = response;
    });
  }
}
