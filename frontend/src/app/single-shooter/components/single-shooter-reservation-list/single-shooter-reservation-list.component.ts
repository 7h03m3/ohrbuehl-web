import { Component } from '@angular/core';
import { BusinessHourReservationDto } from '../../../shared/dtos/business-hour-reservation.dto';
import { BusinessHoursDto } from '../../../shared/dtos/business-hours.dto';
import { BusinessHourSingleShooterApi } from '../../../api/business-hour-single-shooter-api';
import { AuthService } from '../../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusinessHourHelperService } from '../../../business-hours/classes/business-hour-helper.service';
import { catchError, EMPTY, Observable } from 'rxjs';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { SortHelper } from '../../../shared/classes/sort-helper';
import { UserDto } from '../../../shared/dtos/user.dto';
import { UserApi } from '../../../api/user-api';

@Component({
  selector: 'app-single-shooter-reservation-list',
  templateUrl: './single-shooter-reservation-list.component.html',
  styleUrls: ['./single-shooter-reservation-list.component.css'],
})
export class SingleShooterReservationListComponent {
  public reservationList = new Array<BusinessHourReservationDto>();
  public dateList = new Array<BusinessHoursDto>();
  public eventLimit = 0;
  public userList = new Array<UserDto>();
  public userId = 0;

  constructor(
    private reservationApi: BusinessHourSingleShooterApi,
    private userApi: UserApi,
    public authService: AuthService,
    private snackBar: MatSnackBar,
    private helper: BusinessHourHelperService,
    private userLocalData: UserLocalData,
  ) {}

  public ngOnInit() {
    this.userId = this.authService.getUserId();
    this.fetch();

    this.reservationApi.getEventLimit().subscribe((response) => {
      this.eventLimit = +response;
    });

    if (this.authService.isAdmin()) {
      this.userApi.getAll().subscribe((response) => {
        this.userList = response;
        SortHelper.sortUserListByName(this.userList);
      });
    }
  }

  public onUserChange(userId: number) {
    this.userId = +userId;
    this.fetch();
  }

  public onAdd() {
    this.reservationApi.getReservationDates().subscribe((response) => {
      const dialogRef = this.helper.openAddDialog(response, true);

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const reservation = result as BusinessHourReservationDto;
          reservation.ownerId = this.authService.getUserId();

          this.triggerRequest(this.reservationApi.createReservation(reservation));
        }
      });
    });
  }

  public onEdit(element: BusinessHourReservationDto) {
    const dialogRef = this.helper.openEditDialog(element, true);

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

  public onTimeRangeChange() {
    this.fetch();
  }

  private fetch() {
    if (this.userId != 0) {
      const year = this.userLocalData.getCurrentYear();
      this.reservationApi.getReservationsOfYear(this.userId, year).subscribe((response) => {
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
