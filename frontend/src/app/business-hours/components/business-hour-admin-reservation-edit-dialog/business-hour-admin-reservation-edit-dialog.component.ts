import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BusinessHourReservationDto } from '../../../shared/dtos/business-hour-reservation.dto';
import { ReservationFacilityType } from '../../../shared/enums/reservation-facility-type.enum';
import { StringHelper } from '../../../shared/classes/string-helper';
import { ReservationEventType } from '../../../shared/enums/reservation-event-type.enum';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { OrganizationApi } from '../../../api/classes/organization-api';
import { ApiService } from '../../../api/api.service';
import { UserApi } from '../../../api/classes/user-api';
import { UserDto } from '../../../shared/dtos/user.dto';

export interface BusinessHourAdminReservationEditDialogData {
  reservation: BusinessHourReservationDto;
  facilityTypeDisabled: boolean;
  maxCount: number;
}

@Component({
  selector: 'business-hour-admin-reservation-edit-dialog',
  templateUrl: './business-hour-admin-reservation-edit-dialog.component.html',
  styleUrls: ['./business-hour-admin-reservation-edit-dialog.component.css'],
})
export class BusinessHourAdminReservationEditDialogComponent {
  public facilityTypes = Object.keys(ReservationFacilityType);
  public eventTypes = Object.keys(ReservationEventType);
  public organizationList = new Array<OrganizationDto>();
  public userList = new Array<UserDto>();
  private organizationApi: OrganizationApi;
  private userApi: UserApi;

  constructor(
    public dialogRef: MatDialogRef<BusinessHourAdminReservationEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BusinessHourAdminReservationEditDialogData,
    private apiService: ApiService,
  ) {
    this.organizationApi = apiService.getOrganization();
    this.userApi = apiService.getUser();
  }

  public ngOnInit() {
    this.fetchOrganizationList();
    this.fetchUserList();
  }

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
    return StringHelper.getEventTypeString(type as ReservationEventType);
  }

  public fetchOrganizationList() {
    this.organizationApi.getAll().subscribe((response) => {
      this.organizationList = new Array<OrganizationDto>();

      const dummy = new OrganizationDto();
      dummy.id = 0;
      dummy.abbreviation = 'Einzelschütze';
      this.organizationList.push(dummy);

      response.forEach((current) => {
        this.organizationList.push(current);
      });
    });
  }

  public fetchUserList() {
    this.userApi.getAll().subscribe((response) => {
      this.userList = response;
    });
  }
}
