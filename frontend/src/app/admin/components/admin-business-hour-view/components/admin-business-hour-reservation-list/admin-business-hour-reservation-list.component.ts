import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
import { OrganizationDto } from '../../../../../shared/dtos/organization.dto';

@Component({
  selector: 'app-admin-business-hour-reservation-list',
  templateUrl: './admin-business-hour-reservation-list.component.html',
  styleUrls: ['./admin-business-hour-reservation-list.component.css'],
})
export class AdminBusinessHourReservationListComponent implements OnChanges {
  @Input() title!: string;
  @Input() businessHour!: BusinessHoursDto;
  @Input() occupancy!: BusinessHourOccupancyDto;
  @Input() facilityType = ReservationFacilityType.Distance25mBlockManuel.toString();
  @Input() organizationList = new Array<OrganizationDto>();
  @Output() reservationChanged = new EventEmitter<boolean>();

  public reservations = new Array<BusinessHourReservationDto>();
  public displayedColumns = ['number', 'owner', 'organization', 'eventType', 'count', 'comment', 'action'];
  public addDisabled = false;
  private businessHourApi: BusinessHourAdminApi;

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
  ) {
    this.businessHourApi = this.apiService.getBusinessHoursAdmin();
  }

  public ngOnInit() {
    this.fetchReservations();
  }

  public ngOnChanges(changes: SimpleChanges) {
    this.fetchReservations();
  }

  public getOccupancyString(): string {
    return StringHelper.getOccupancyString(this.occupancy);
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
          this.snackBar.open('Fehler: "' + response.error.message + '"', 'Okay');
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

  public getOrganizationString(element: BusinessHourReservationDto): string {
    if (!element.organization) {
      return 'Einzelschütze';
    }

    return element.organization.name + ' (' + element.organization.abbreviation + ')';
  }

  private setLocked(element: BusinessHourReservationDto, isLocked: boolean) {
    element.locked = isLocked;
    this.businessHourApi.lockReservation(element).subscribe();
  }

  private openDialog(reservation: BusinessHourReservationDto, maxCount: number) {
    const dialogRef = this.dialog.open(AdminBusinessHourReservationEditDialogComponent, {
      data: {
        reservation: reservation,
        facilityTypeDisabled: true,
        maxCount: maxCount,
        organizationList: this.organizationList,
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
          this.snackBar.open('Fehler: "' + response.error.message + '"', 'Okay');
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
          this.snackBar.open('Fehler: "' + response.error.message + '"', 'Okay');
          return EMPTY;
        }),
      )
      .subscribe((response) => {
        this.reservationChanged.emit(true);
      });
  }

  private fetchReservations() {
    this.addDisabled = this.occupancy.current >= this.occupancy.max;

    const facilityType = this.facilityType as ReservationFacilityType;

    this.reservations = this.businessHour.reservations.filter((current) => {
      return current.facilityType == facilityType;
    });
  }
}
