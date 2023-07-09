import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BusinessHourOccupancyDto } from '../../../../../shared/dtos/business-hour-occupancy.dto';
import { StringHelper } from '../../../../../shared/classes/string-helper';
import { BusinessHourReservationDto } from '../../../../../shared/dtos/business-hour-reservation.dto';
import { MatDialog } from '@angular/material/dialog';
import { AdminBusinessHourReservationEditDialogComponent } from '../../../admin-business-hour-reservation-edit-dialog/admin-business-hour-reservation-edit-dialog.component';
import { ReservationFacilityType } from '../../../../../shared/enums/reservation-facility-type.enum';
import { ApiService } from '../../../../../api/api.service';
import { BusinessHourAdminApi } from '../../../../../api/classes/business-hour-admin-api';
import { catchError, EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusinessHoursDto } from '../../../../../shared/dtos/business-hours.dto';
import { AuthService } from '../../../../../auth/auth.service';

@Component({
  selector: 'app-admin-business-hour-reservation-list',
  templateUrl: './admin-business-hour-reservation-list.component.html',
  styleUrls: ['./admin-business-hour-reservation-list.component.css'],
})
export class AdminBusinessHourReservationListComponent {
  @Input() title!: string;
  @Input() businessHour!: BusinessHoursDto;
  @Input() occupancy!: BusinessHourOccupancyDto;
  @Input() list!: BusinessHourReservationDto[];
  @Input() facilityType = ReservationFacilityType.Distance25mBlockManuel.toString();
  @Output() reservationChanged = new EventEmitter<boolean>();
  private businessHourApi: BusinessHourAdminApi;

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
  ) {
    this.businessHourApi = this.apiService.getBusinessHoursAdmin();
  }

  public getOccupancyString(): string {
    return StringHelper.getOccupancyString(this.occupancy);
  }

  public onAdd() {
    const reservation = new BusinessHourReservationDto();
    reservation.facilityType = this.facilityType as ReservationFacilityType;
    reservation.businessHourId = this.businessHour.id;
    reservation.ownerId = this.authService.getUserId();
    const dialogRef = this.dialog.open(AdminBusinessHourReservationEditDialogComponent, {
      data: {
        reservation: reservation,
        facilityTypeDisabled: true,
        maxCount: this.occupancy.max - this.occupancy.current,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data != undefined) {
        this.businessHourApi
          .createReservation(data)
          .pipe(
            catchError((response) => {
              this.snackBar.open('Fehler: "' + response.error.message + '"', 'Okay');
              return EMPTY;
            }),
          )
          .subscribe((response) => {
            this.reservationChanged.emit(true);
          });
      }
    });
  }
}
