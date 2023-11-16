import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BusinessHoursDto } from '../../../shared/dtos/business-hours.dto';
import { ReservationFacilityType } from '../../../shared/enums/reservation-facility-type.enum';
import { StringHelper } from '../../../shared/classes/string-helper';
import { BusinessHourHelperService } from '../../classes/business-hour-helper.service';
import { BusinessHourOccupancyDto } from '../../../shared/dtos/business-hour-occupancy.dto';

@Component({
  selector: 'business-hour-max-occupancy-edit-dialog',
  templateUrl: './business-hour-max-occupancy-edit-dialog.component.html',
  styleUrls: ['./business-hour-max-occupancy-edit-dialog.component.css'],
})
export class BusinessHourMaxOccupancyEditDialogComponent {
  public facilityTypes = Object.values(ReservationFacilityType);

  public constructor(
    public dialogRef: MatDialogRef<BusinessHourMaxOccupancyEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BusinessHoursDto,
  ) {}

  public onSubmit(): void {
    this.dialogRef.close(this.data);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public isFormValid(): boolean {
    let result = true;
    this.facilityTypes.forEach((current) => {
      const occupancy = this.getOccupancy(current);
      if (occupancy.max < 0 || occupancy.max < occupancy.current) {
        result = false;
      }
    });
    return result;
  }

  public getFacilityTypeString(type: ReservationFacilityType): string {
    return StringHelper.getReservationFacilityTypeString(type);
  }

  public getCountString(type: ReservationFacilityType): string {
    const occupancy = this.getOccupancy(type);
    return occupancy.current + ' / ';
  }

  public getOccupancy(type: ReservationFacilityType): BusinessHourOccupancyDto {
    return BusinessHourHelperService.getOccupancy(this.data, type);
  }

  public getOccupancyUnitString(type: ReservationFacilityType): string {
    const occupancy = this.getOccupancy(type);
    return StringHelper.getOccupancyUnitString(type, occupancy.max);
  }
}
