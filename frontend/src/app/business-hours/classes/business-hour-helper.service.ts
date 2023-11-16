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
import { ListTimeRange } from '../../shared/enums/list-time-range';
import { UserLocalData } from '../../shared/classes/user-local-data';
import { EventHelper } from '../../event-manager/classes/event-helper';
import { BusinessHourMaxOccupancyEditDialogComponent } from '../components/business-hour-max-occupancy-edit-dialog/business-hour-max-occupancy-edit-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class BusinessHourHelperService {
  constructor(private dialog: MatDialog, private userLocalData: UserLocalData, private helper: EventHelper) {}

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

  public static isStartInDateList(time: number, list: Date[]): boolean {
    const date = new Date(+time);

    for (const current of list) {
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
      return a.start > b.start ? 1 : a.start < b.start ? -1 : 0;
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

  public static limitSingleShooterMaxCount(type: ReservationFacilityType, maxCount: number): number {
    let singleShooterMax = 0;
    switch (type) {
      case ReservationFacilityType.Distance25mBlockManuel:
      case ReservationFacilityType.Distance25mBlockElectronic:
        singleShooterMax = 1;
        break;
      case ReservationFacilityType.Distance50mManuel:
      case ReservationFacilityType.Distance50mElectronic:
      case ReservationFacilityType.Distance100m:
      case ReservationFacilityType.Distance300m:
        singleShooterMax = 2;
        break;
      default:
        singleShooterMax = 0;
        break;
    }

    if (maxCount > singleShooterMax) {
      maxCount = singleShooterMax;
    }

    return maxCount;
  }

  public filterReservationList(list: BusinessHourReservationDto[]): BusinessHourReservationDto[] {
    const timeRange = this.userLocalData.getCurrentListItemRange();
    if (timeRange == ListTimeRange.PastItems) {
      const time = Date.now();
      list = list.filter((current) => {
        return current.businessHour.start < time;
      });
    } else if (timeRange == ListTimeRange.FutureItems) {
      const time = Date.now();

      list = list.filter((current) => {
        return current.businessHour.start > time;
      });

      list.sort((a, b) => {
        return a.businessHour.start > b.businessHour.start ? 1 : a.businessHour.start < b.businessHour.start ? -1 : 0;
      });
    }

    return list;
  }

  public filterBusinessHourList(list: BusinessHoursDto[]): BusinessHoursDto[] {
    const timeRange = this.userLocalData.getCurrentListItemRange();
    if (timeRange == ListTimeRange.PastItems) {
      const time = Date.now();
      list = list.filter((current) => {
        return current.start < time;
      });
    } else if (timeRange == ListTimeRange.FutureItems) {
      const time = Date.now();

      list = list.filter((current) => {
        return current.start > time;
      });

      list.sort((a, b) => {
        return a.start > b.start ? 1 : a.start < b.start ? -1 : 0;
      });
    }

    return list;
  }

  public openAddDialog(
    dates: BusinessHoursDto[],
    isSingleShooter = false,
  ): MatDialogRef<BusinessHourReservationAddDialogComponent> {
    const element = new BusinessHourReservationDto();
    return this.dialog.open(BusinessHourReservationAddDialogComponent, {
      data: {
        dates: dates,
        reservation: element,
        isSingleShooter: isSingleShooter,
      },
    });
  }

  public openEditDialog(
    element: BusinessHourReservationDto,
    isSingleShooter = false,
  ): MatDialogRef<BusinessHourReservationEditDialogComponent> {
    return this.dialog.open(BusinessHourReservationEditDialogComponent, {
      data: {
        reservation: element,
        isSingleShooter: isSingleShooter,
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

  public openMaxOccupancyEditDialog(
    element: BusinessHoursDto,
  ): MatDialogRef<BusinessHourMaxOccupancyEditDialogComponent> {
    return this.dialog.open(BusinessHourMaxOccupancyEditDialogComponent, {
      data: element,
    });
  }
}
