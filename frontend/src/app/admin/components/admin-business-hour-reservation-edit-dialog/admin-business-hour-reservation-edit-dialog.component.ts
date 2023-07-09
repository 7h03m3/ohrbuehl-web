import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BusinessHourReservationDto } from '../../../shared/dtos/business-hour-reservation.dto';
import { ReservationFacilityType } from '../../../shared/enums/reservation-facility-type.enum';
import { StringHelper } from '../../../shared/classes/string-helper';
import { ReservationEventType } from '../../../shared/enums/reservation-event-type.enum';

export interface AdminBusinessHourReservationEditDialogData {
  reservation: BusinessHourReservationDto;
  facilityTypeDisabled: boolean;
  maxCount: number;
}

@Component({
  selector: 'app-admin-business-hour-reservation-edit-dialog',
  templateUrl: './admin-business-hour-reservation-edit-dialog.component.html',
  styleUrls: ['./admin-business-hour-reservation-edit-dialog.component.css'],
})
export class AdminBusinessHourReservationEditDialogComponent {
  public facilityTypes = Object.keys(ReservationFacilityType);
  public eventTypes = Object.keys(ReservationEventType);

  constructor(
    public dialogRef: MatDialogRef<AdminBusinessHourReservationEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminBusinessHourReservationEditDialogData,
  ) {}

  public ngOnInit() {}

  public onSubmit(): void {
    this.dialogRef.close(this.data.reservation);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public isFormValid(): boolean {
    const count = this.data.reservation.count;
    return count >= 1 && count <= this.data.maxCount;
  }

  public getFacilityTypeString(type: string): string {
    return StringHelper.getReservationFacilityTypeString(type as ReservationFacilityType);
  }

  public getEventTypeString(type: string): string {
    return StringHelper.getEventFacilityTypeString(type as ReservationEventType);
  }
}
