import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BusinessHourReservationDto } from '../../../shared/dtos/business-hour-reservation.dto';
import { ReservationFacilityType } from '../../../shared/enums/reservation-facility-type.enum';
import { StringHelper } from '../../../shared/classes/string-helper';
import { ReservationEventType } from '../../../shared/enums/reservation-event-type.enum';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';

export interface BusinessHourAdminReservationEditDialogData {
  reservation: BusinessHourReservationDto;
  facilityTypeDisabled: boolean;
  maxCount: number;
  organizationList: OrganizationDto[];
}

@Component({
  selector: 'business-hour-admin-reservation-edit-dialog',
  templateUrl: './business-hour-admin-reservation-edit-dialog.component.html',
  styleUrls: ['./business-hour-admin-reservation-edit-dialog.component.css'],
})
export class BusinessHourAdminReservationEditDialogComponent {
  public facilityTypes = Object.keys(ReservationFacilityType);
  public eventTypes = Object.keys(ReservationEventType);

  constructor(
    public dialogRef: MatDialogRef<BusinessHourAdminReservationEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BusinessHourAdminReservationEditDialogData,
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
