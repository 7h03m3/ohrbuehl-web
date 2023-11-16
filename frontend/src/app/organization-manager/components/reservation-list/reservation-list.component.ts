import { Component } from '@angular/core';
import { BusinessHourReservationDto } from '../../../shared/dtos/business-hour-reservation.dto';
import { ApiService } from '../../../api/api.service';
import { BusinessHourOrganizationApi } from '../../../api/classes/business-hour-organization-api';
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
  private reservationApi: BusinessHourOrganizationApi;
  private organizationId = 0;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private helper: BusinessHourHelperService,
    private userLocalData: UserLocalData,
  ) {
    this.reservationApi = apiService.getBusinessHoursOrganization();
  }

  public ngOnInit() {
    this.organizationId = this.authService.getManagingOrganizationId();
    this.fetch();
  }

  public onTimeRangeChange() {
    this.fetch();
  }

  public onAdd() {
    this.reservationApi.getReservationDates().subscribe((response) => {
      const dialogRef = this.helper.openAddDialog(response);

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const reservation = result as BusinessHourReservationDto;
          reservation.organizationId = this.organizationId;
          reservation.ownerId = this.authService.getUserId();

          this.triggerRequest(this.reservationApi.createReservation(reservation));
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
        this.triggerRequest(this.reservationApi.deleteReservation(element.id));
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

  private triggerRequest(obervable: Observable<any>) {
    obervable
      .pipe(
        catchError((response) => {
          this.snackBar.open('Fehler: "' + response.error.message + '"', 'Okay', { duration: 10000 });
          this.fetch();
          return EMPTY;
        }),
      )
      .subscribe(() => {
        this.fetch();
      });
  }
}
