import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BusinessHourReservationDto } from '../../shared/dtos/business-hour-reservation.dto';
import { BusinessHourReservationEditDialogComponent } from '../components/business-hour-reservation-edit-dialog/business-hour-reservation-edit-dialog.component';
import { DeleteConfirmDialogComponent } from '../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { StringHelper } from '../../shared/classes/string-helper';
import { BusinessHourReservationAddDialogComponent } from '../components/business-hour-reservation-add-dialog/business-hour-reservation-add-dialog.component';
import { BusinessHoursDto } from '../../shared/dtos/business-hours.dto';
import { ReservationFacilityType } from '../../shared/enums/reservation-facility-type.enum';
import { BusinessHourOccupancyDto } from '../../shared/dtos/business-hour-occupancy.dto';

@Injectable({
  providedIn: 'root',
})
export class BusinessHourHelperService {
  constructor(private dialog: MatDialog) {}

  public static isStartInBusinessHourList(time: number, list: BusinessHoursDto[]): boolean {
    const date = new Date(+time);

    for (const businessHour of list) {
      const current = new Date(+businessHour.start);
      if (
        current.getFullYear() == date.getFullYear() &&
        current.getMonth() == date.getMonth() &&
        current.getDate() == date.getDate()
      ) {
        return true;
      }
    }

    return false;
  }

  public static getBusinessHourInListByStart(time: number, list: BusinessHoursDto[]): BusinessHoursDto[] {
    const date = new Date(+time);

    return list.filter((current) => {
      const currentDate = new Date(+current.start);
      return (
        currentDate.getFullYear() == date.getFullYear() &&
        currentDate.getMonth() == date.getMonth() &&
        currentDate.getDate() == date.getDate()
      );
    });
  }

  public static sortBusinessHourListByStart(list: BusinessHoursDto[]) {
    list.sort((a, b) => {
      if (a.start > b.start) {
        return 1;
      }

      if (a.start < b.start) {
        return -1;
      }

      return 0;
    });
  }

  public static getOccupancy(businessHour: BusinessHoursDto, type: ReservationFacilityType): BusinessHourOccupancyDto {
    switch (type) {
      case ReservationFacilityType.Distance25mBlockManuel:
        return businessHour.distance25mBlockManualOccupancy;
      case ReservationFacilityType.Distance25mBlockElectronic:
        return businessHour.distance25mBlockElectronicOccupancy;
      case ReservationFacilityType.Distance50mManuel:
        return businessHour.distance50mManualOccupancy;
      case ReservationFacilityType.Distance50mElectronic:
        return businessHour.distance50mElectronicOccupancy;
      case ReservationFacilityType.Distance100m:
        return businessHour.distance100mOccupancy;
      case ReservationFacilityType.Distance300m:
        return businessHour.distance300mOccupancy;
      default:
        return new BusinessHourOccupancyDto();
    }
  }

  public openAddDialog(dates: BusinessHoursDto[]): MatDialogRef<BusinessHourReservationAddDialogComponent> {
    const element = new BusinessHourReservationDto();
    return this.dialog.open(BusinessHourReservationAddDialogComponent, {
      data: {
        dates: dates,
        reservation: element,
      },
    });
  }

  public openEditDialog(element: BusinessHourReservationDto): MatDialogRef<BusinessHourReservationEditDialogComponent> {
    return this.dialog.open(BusinessHourReservationEditDialogComponent, {
      data: {
        reservation: element,
      },
    });
  }

  public openDeleteDialog(element: BusinessHourReservationDto): MatDialogRef<DeleteConfirmDialogComponent> {
    const dateString = StringHelper.getStartEndDateTimeString(element.businessHour.start, element.businessHour.end);
    const typeString = StringHelper.getReservationFacilityTypeString(element.facilityType);
    return this.dialog.open(DeleteConfirmDialogComponent, {
      data: { itemName: 'die Reservation vom ' + dateString + ' (' + typeString + ')' },
    });
  }
}
