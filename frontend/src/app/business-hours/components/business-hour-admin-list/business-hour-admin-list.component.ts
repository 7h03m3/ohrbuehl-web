import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { BusinessHourAdminApi } from '../../../api/classes/business-hour-admin-api';
import { BusinessHoursDto } from '../../../shared/dtos/business-hours.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StringHelper } from '../../../shared/classes/string-helper';
import { BusinessHourOccupancyDto } from '../../../shared/dtos/business-hour-occupancy.dto';
import { BusinessHourAdminEditDialogComponent } from '../business-hour-admin-edit-dialog/business-hour-admin-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'business-hour-admin-list',
  templateUrl: './business-hour-admin-list.component.html',
  styleUrls: ['./business-hour-admin-list.component.css'],
})
export class BusinessHourAdminListComponent {
  public dataSource = new MatTableDataSource<BusinessHoursDto>();
  public displayedColumns: string[] = [
    'date',
    '25m',
    '50m',
    '100m',
    '300m',
    'public',
    'reservation',
    'comment',
    'action',
  ];
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  private businessHourApi: BusinessHourAdminApi;

  constructor(private apiService: ApiService, private dialog: MatDialog, private router: Router) {
    this.businessHourApi = apiService.getBusinessHoursAdmin();
  }

  public ngOnInit() {
    this.fetch();
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getDateString(element: BusinessHoursDto): string {
    return StringHelper.getStartEndDateTimeString(element.start, element.end);
  }

  public getOccupancyString(occupancy: BusinessHourOccupancyDto): string {
    return StringHelper.getOccupancyString(occupancy);
  }

  public getOccupanciesString(occupancy1: BusinessHourOccupancyDto, occupancy2: BusinessHourOccupancyDto): string {
    return StringHelper.getOccupanciesString(occupancy1, occupancy2);
  }

  public onAdd() {
    const element = new BusinessHoursDto();
    const dialogRef = this.dialog.open(BusinessHourAdminEditDialogComponent, {
      data: {
        businessHours: element,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data != undefined) {
        if (data.businessHours.id == 0) {
          this.businessHourApi.create(data.businessHours).subscribe((data) => {
            this.fetch();
          });
        } else {
          this.businessHourApi.update(data.businessHours).subscribe((data) => {
            this.fetch();
          });
        }
      } else {
        this.fetch();
      }
    });
  }

  public async onView(element: BusinessHoursDto) {
    await new Promise((f) => setTimeout(f, 250));
    this.router.navigate(['/admin/business-hour', { id: element.id }]);
  }

  private fetch() {
    this.businessHourApi.getAll().subscribe((response) => {
      this.dataSource.data = response;
    });
  }
}
