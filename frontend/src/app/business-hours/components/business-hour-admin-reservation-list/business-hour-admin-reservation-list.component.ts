import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { BusinessHourOccupancyDto } from '../../../shared/dtos/business-hour-occupancy.dto';
import { StringHelper } from '../../../shared/classes/string-helper';
import { BusinessHourReservationDto } from '../../../shared/dtos/business-hour-reservation.dto';
import { MatDialog } from '@angular/material/dialog';
import { BusinessHourAdminReservationEditDialogComponent } from '../business-hour-admin-reservation-edit-dialog/business-hour-admin-reservation-edit-dialog.component';
import { ReservationFacilityType } from '../../../shared/enums/reservation-facility-type.enum';
import { BusinessHourAdminApi } from '../../../api/business-hour-admin-api';
import { catchError, EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusinessHoursDto } from '../../../shared/dtos/business-hours.dto';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'business-hour-admin-reservation-list',
  templateUrl: './business-hour-admin-reservation-list.component.html',
  styleUrls: ['./business-hour-admin-reservation-list.component.css'],
})
export class BusinessHourAdminReservationListComponent implements OnChanges {
  public title = '';
  @Input() businessHour!: BusinessHoursDto;
  @Input() occupancy!: BusinessHourOccupancyDto;
  @Input() facilityType = ReservationFacilityType.Distance25mBlockManuel.toString();
  @Input() showOwner = false;
  @Output() reservationChanged = new EventEmitter<boolean>();

  public reservations = new Array<BusinessHourReservationDto>();
  public displayedColumns = ['number', 'owner', 'organization', 'eventType', 'count', 'comment', 'action'];
  public addDisabled = false;

  constructor(
    private dialog: MatDialog,
    private businessHourApi: BusinessHourAdminApi,
    private snackBar: MatSnackBar,
    private authService: AuthService,
  ) {}

  public ngOnInit() {
    this.title = StringHelper.getReservationFacilityTypeString(this.facilityType as ReservationFacilityType);
    this.fetchReservations();
  }

  public ngOnChanges(changes: SimpleChanges) {
    this.fetchReservations();
  }

  public isAddDisabled(): boolean {
    return this.addDisabled || !this.businessHour.enableReservation;
  }

  public getOwnerString(element: BusinessHourReservationDto): string {
    const owner = element.owner;
    if (owner.firstName == '' && owner.lastName == '') {
      return owner.userName;
    }

    return owner.firstName + ' ' + owner.lastName;
  }

  public onEdit(element: BusinessHourReservationDto) {
    this.openDialog(element, this.occupancy.max - this.occupancy.current + element.count);
  }

  public onDelete(element: BusinessHourReservationDto) {
    this.businessHourApi
      .deleteReservation(element.id)
      .pipe(
        catchError((response) => {
          this.snackBar.open('Fehler: "' + response.error.message + '"', 'Okay', { duration: 10000 });
          return EMPTY;
        }),
      )
      .subscribe((response) => {
        this.reservationChanged.emit(true);
      });
  }

  public onAdd() {
    const reservation = new BusinessHourReservationDto();
    reservation.facilityType = this.facilityType as ReservationFacilityType;
    reservation.businessHourId = this.businessHour.id;
    reservation.ownerId = this.authService.getUserId();
    this.openDialog(reservation, this.occupancy.max - this.occupancy.current);
  }

  public onLock(element: BusinessHourReservationDto) {
    this.setLocked(element, true);
  }

  public onUnlock(element: BusinessHourReservationDto) {
    this.setLocked(element, false);
  }

  private setLocked(element: BusinessHourReservationDto, isLocked: boolean) {
    element.locked = isLocked;
    this.businessHourApi.lockReservation(element).subscribe();
  }

  private openDialog(reservation: BusinessHourReservationDto, maxCount: number) {
    const dialogRef = this.dialog.open(BusinessHourAdminReservationEditDialogComponent, {
      data: {
        reservation: reservation,
        facilityTypeDisabled: true,
        maxCount: maxCount,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data != undefined) {
        if (data.id == 0) {
          this.createReservation(data);
        } else {
          this.updateReservation(data);
        }
      }
    });
  }

  private createReservation(element: BusinessHourReservationDto) {
    this.businessHourApi
      .createReservation(element)
      .pipe(
        catchError((response) => {
          this.snackBar.open('Fehler: "' + response.error.message + '"', 'Okay', { duration: 10000 });
          return EMPTY;
        }),
      )
      .subscribe((response) => {
        this.reservationChanged.emit(true);
      });
  }

  private updateReservation(element: BusinessHourReservationDto) {
    this.businessHourApi
      .updateReservation(element)
      .pipe(
        catchError((response) => {
          this.snackBar.open('Fehler: "' + response.error.message + '"', 'Okay', { duration: 10000 });
          return EMPTY;
        }),
      )
      .subscribe((response) => {
        this.reservationChanged.emit(true);
      });
  }

  private fetchReservations() {
    if (!this.showOwner) {
      this.displayedColumns = this.displayedColumns.filter((current) => {
        return current != 'owner';
      });
    }

    this.addDisabled = this.occupancy.current >= this.occupancy.max;

    const facilityType = this.facilityType as ReservationFacilityType;

    this.reservations = this.businessHour.reservations.filter((current) => {
      return current.facilityType == facilityType;
    });
  }
}
