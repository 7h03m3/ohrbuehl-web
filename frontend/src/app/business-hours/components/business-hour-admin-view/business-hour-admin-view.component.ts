import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api/api.service';
import { BusinessHourAdminApi } from '../../../api/classes/business-hour-admin-api';
import { BusinessHoursDto } from '../../../shared/dtos/business-hours.dto';
import { StringHelper } from '../../../shared/classes/string-helper';
import { BusinessHourOccupancyDto } from '../../../shared/dtos/business-hour-occupancy.dto';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessHourAdminEditDialogComponent } from '../business-hour-admin-edit-dialog/business-hour-admin-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { UrlService } from '../../../shared/services/url.service';

export interface TableData {
  text: string;
  count: string;
}

@Component({
  selector: 'business-hour-admin-view',
  templateUrl: './business-hour-admin-view.component.html',
  styleUrls: ['./business-hour-admin-view.component.css'],
})
export class BusinessHourAdminViewComponent {
  public businessHour = new BusinessHoursDto();
  public dataSource: MatTableDataSource<TableData> = new MatTableDataSource<TableData>();
  public displayedColumns: string[] = ['text', 'count'];
  public deleteDisabled = true;
  private businessHourApi: BusinessHourAdminApi;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private urlService: UrlService,
  ) {
    this.businessHourApi = apiService.getBusinessHoursAdmin();
  }

  public ngOnInit() {
    this.route.paramMap.subscribe((data) => {
      const idString = data.get('id');

      if (idString != null) {
        this.fetch(+idString);
      }
    });
  }

  public getDateString(): string {
    return StringHelper.getStartEndDateTimeString(this.businessHour.start, this.businessHour.end);
  }

  public onBack() {
    this.router.navigate([this.urlService.getPreviousUrl()]);
  }

  public onReservationChanged() {
    this.fetch(this.businessHour.id);
  }

  public onEdit() {
    const dialogRef = this.dialog.open(BusinessHourAdminEditDialogComponent, {
      data: {
        businessHours: this.businessHour,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data != undefined) {
        this.businessHourApi.update(data.businessHours).subscribe((data) => {
          this.fetch(this.businessHour.id);
        });
      } else {
        this.fetch(this.businessHour.id);
      }
    });
  }

  public onDelete() {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        itemName: 'die Öffnungszeit (' + this.getDateString() + ')',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteDisabled = true;
        this.businessHourApi.delete(this.businessHour.id).subscribe((data) => {
          this.onBack();
        });
      }
    });
  }

  public getOccupancyString(occupancy: BusinessHourOccupancyDto): string {
    return occupancy.current + ' / ' + occupancy.max;
  }

  private fetch(id: number) {
    this.businessHourApi.getById(id).subscribe((response) => {
      this.businessHour = response;
      const tableData = new Array<TableData>();
      tableData.push({
        text: '25m (manuell)',
        count: this.getOccupancyString(this.businessHour.distance25mBlockManualOccupancy),
      });
      tableData.push({
        text: '25m (elektronisch)',
        count: this.getOccupancyString(this.businessHour.distance25mBlockElectronicOccupancy),
      });

      tableData.push({
        text: '50m (manuell)',
        count: this.getOccupancyString(this.businessHour.distance50mManualOccupancy),
      });
      tableData.push({
        text: '50m (elektronisch)',
        count: this.getOccupancyString(this.businessHour.distance50mElectronicOccupancy),
      });
      tableData.push({
        text: '100m',
        count: this.getOccupancyString(this.businessHour.distance100mOccupancy),
      });
      tableData.push({
        text: '300m',
        count: this.getOccupancyString(this.businessHour.distance300mOccupancy),
      });
      this.dataSource.data = tableData;
      this.deleteDisabled = false;
    });
  }
}
