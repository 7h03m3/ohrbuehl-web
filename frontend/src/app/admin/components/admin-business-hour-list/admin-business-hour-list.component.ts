import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { BusinessHourAdminApi } from '../../../api/classes/business-hour-admin-api';
import { BusinessHoursDto } from '../../../shared/dtos/business-hours.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StringHelper } from '../../../shared/classes/string-helper';
import { BusinessHourOccupancyDto } from '../../../shared/dtos/business-hour-occupancy.dto';
import { AdminBusinessHourEditDialogComponent } from '../admin-business-hour-edit-dialog/admin-business-hour-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-business-hour-list',
  templateUrl: './admin-business-hour-list.component.html',
  styleUrls: ['./admin-business-hour-list.component.css'],
})
export class AdminBusinessHourListComponent {
  public dataSource = new MatTableDataSource<BusinessHoursDto>();
  public displayedColumns: string[] = [
    'date',
    '25m_m',
    '25m_e',
    '50m_m',
    '50m_e',
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

  constructor(private apiService: ApiService, private dialog: MatDialog) {
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
    return occupancy.current + ' / ' + occupancy.max;
  }

  public onAdd() {
    const newElement = new BusinessHoursDto();
    this.openEditDialog(newElement);
  }

  public onEdit(element: BusinessHoursDto) {
    this.openEditDialog(element);
  }

  public onDelete(element: BusinessHoursDto) {}

  private openEditDialog(element: BusinessHoursDto) {
    const dialogRef = this.dialog.open(AdminBusinessHourEditDialogComponent, {
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

  private fetch() {
    this.businessHourApi.getAll().subscribe((response) => {
      this.dataSource.data = response;
    });
  }
}
