import { Component } from '@angular/core';
import { BusinessHourReservationDto } from '../../../shared/dtos/business-hour-reservation.dto';
import { BusinessHourOrganizationApi } from '../../../api/business-hour-organization-api';
import { AuthService } from '../../../auth/auth.service';
import { catchError, EMPTY, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusinessHoursDto } from '../../../shared/dtos/business-hours.dto';
import { BusinessHourHelperService } from '../../../business-hours/classes/business-hour-helper.service';
import { UserLocalData } from '../../../shared/classes/user-local-data';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent {
  public reservationList = new Array<BusinessHourReservationDto>();
  public dateList = new Array<BusinessHoursDto>();
  private organizationId = 0;

  constructor(
    private reservationApi: BusinessHourOrganizationApi,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private helper: BusinessHourHelperService,
    private userLocalData: UserLocalData,
  ) {}

  public ngOnInit() {
    this.organizationId = this.authService.getManagingOrganizationId();
    this.fetch();
  }

  public onTimeRangeChange() {
    this.fetch();
  }

  public onAdd() {
    this.reservationApi.getAllUpcomingDates().subscribe((response) => {
      const dialogRef = this.helper.openAddDialog(response);

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const reservation = result as BusinessHourReservationDto;
          reservation.organizationId = this.organizationId;
          reservation.ownerId = this.authService.getUserId();

          this.triggerRequest(this.reservationApi.createReservation(reservation), 'Reservation wurde hinzugefügt');
        }
      });
    });
  }

  public onEdit(element: BusinessHourReservationDto) {
    const dialogRef = this.helper.openEditDialog(element);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.triggerRequest(this.reservationApi.updateReservation(result));
      } else {
        this.fetch();
      }
    });
  }

  public onDelete(element: BusinessHourReservationDto) {
    const dialogRef = this.helper.openDeleteDialog(element);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.triggerRequest(this.reservationApi.deleteReservation(element.id), 'Reservation wurde gelöscht');
      }
    });
  }

  private fetch() {
    if (this.organizationId != 0) {
      const year = this.userLocalData.getCurrentYear();
      this.reservationApi.getReservationsOfYear(this.organizationId, year).subscribe((response) => {
        this.reservationList = this.helper.filterReservationList(response);
      });
    }
  }

  private triggerRequest(observable: Observable<any>, successMessage = '') {
    observable
      .pipe(
        catchError((response) => {
          this.snackBar.open('Fehler: "' + response.error.message + '"', 'Okay', { duration: 10000 });
          this.fetch();
          return EMPTY;
        }),
      )
      .subscribe(() => {
        if (successMessage.length != 0) {
          this.snackBar.open(successMessage, 'Okay', { duration: 5000 });
        }
        this.fetch();
      });
  }
}
