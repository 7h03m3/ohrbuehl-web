import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BusinessHourReservationDto } from '../../../shared/dtos/business-hour-reservation.dto';
import { ReservationEventType } from '../../../shared/enums/reservation-event-type.enum';
import { StringHelper } from '../../../shared/classes/string-helper';
import { BusinessHourHelperService } from '../../classes/business-hour-helper.service';

export interface BusinessHourReservationEditDialogData {
  reservation: BusinessHourReservationDto;
}

@Component({
  selector: 'business-hour-reservation-edit-dialog',
  templateUrl: './business-hour-reservation-edit-dialog.component.html',
  styleUrls: ['./business-hour-reservation-edit-dialog.component.css'],
})
export class BusinessHourReservationEditDialogComponent {
  public eventList = Object.values(ReservationEventType);
  public countMax = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BusinessHourReservationEditDialogData,
    public dialogRef: MatDialogRef<BusinessHourReservationEditDialogComponent>,
  ) {}

  public ngOnInit() {
    const occupancy = BusinessHourHelperService.getOccupancy(
      this.data.reservation.businessHour,
      this.data.reservation.facilityType,
    );

    this.countMax = occupancy.max - occupancy.current + this.data.reservation.count;
  }

  public onSubmit() {
    this.dialogRef.close(this.data.reservation);
  }

  public isFormValid(): boolean {
    return this.data.reservation.count >= 1 && this.data.reservation.count <= this.countMax;
  }

  public getEventTypeString(eventTypeString: string): string {
    return StringHelper.getEventTypeString(eventTypeString as ReservationEventType);
  }

  public getFacilityTypeString(): string {
    return StringHelper.getReservationFacilityTypeString(this.data.reservation.facilityType);
  }

  public getDateString(): string {
    const businessHour = this.data.reservation.businessHour;
    return StringHelper.getStartEndDateTimeString(businessHour.start, businessHour.end);
  }
}
