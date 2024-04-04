import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessHourAdminApi } from '../../../api/business-hour-admin-api';
import { BusinessHoursDto } from '../../../shared/dtos/business-hours.dto';
import { StringHelper } from '../../../shared/classes/string-helper';
import { BusinessHourOccupancyDto } from '../../../shared/dtos/business-hour-occupancy.dto';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessHourAdminEditDialogComponent } from '../business-hour-admin-edit-dialog/business-hour-admin-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { UrlService } from '../../../shared/services/url.service';
import { BusinessHourHelperService } from '../../classes/business-hour-helper.service';
import { ReservationFacilityType } from '../../../shared/enums/reservation-facility-type.enum';

export interface TableData {
  text: string;
  count: string;

  occupancy: BusinessHourOccupancyDto;
  facilityType: ReservationFacilityType;
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

  constructor(
    private businessHourApi: BusinessHourAdminApi,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private urlService: UrlService,
    private helper: BusinessHourHelperService,
  ) {}

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

  public onOccupancyEdit() {
    const dialogRef = this.helper.openMaxOccupancyEditDialog(this.businessHour);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.businessHourApi.updateMaxOccupancy(result).subscribe(() => {
          this.fetch(this.businessHour.id);
        });
      } else {
        this.fetch(this.businessHour.id);
      }
    });
  }

  public getOccupancyString(occupancy: BusinessHourOccupancyDto): string {
    return occupancy.current + ' / ' + occupancy.max;
  }

  public getOccupancyUnitString(data: TableData): string {
    return StringHelper.getOccupancyUnitString(data.facilityType, data.occupancy.max);
  }

  private fetch(id: number) {
    this.businessHourApi.getById(id).subscribe((response) => {
      this.businessHour = response;
      const tableData = new Array<TableData>();

      const facilityTypes = Object.values(ReservationFacilityType);
      facilityTypes.forEach((current) => {
        tableData.push(this.getTableData(current));
      });

      this.dataSource.data = tableData;
      this.deleteDisabled = false;
    });
  }

  private getTableData(facilityType: ReservationFacilityType): TableData {
    const occupancy = BusinessHourHelperService.getOccupancy(this.businessHour, facilityType);
    const tableData: TableData = {
      text: StringHelper.getReservationFacilityTypeString(facilityType),
      count: this.getOccupancyString(occupancy),
      occupancy: occupancy,
      facilityType: facilityType,
    };
    return tableData;
  }
}
