import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BusinessHourReservationDto } from '../../../shared/dtos/business-hour-reservation.dto';
import { MatCalendarCellClassFunction, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BusinessHoursDto } from '../../../shared/dtos/business-hours.dto';
import { StringHelper } from '../../../shared/classes/string-helper';
import { BusinessHourFacilityTypeSelectionItem } from './classes/business-hour-facility-type-selection-item';
import { ReservationFacilityType } from '../../../shared/enums/reservation-facility-type.enum';
import { BusinessHourOccupancyDto } from '../../../shared/dtos/business-hour-occupancy.dto';
import { ReservationEventType } from '../../../shared/enums/reservation-event-type.enum';
import { BusinessHourHelperService } from '../../classes/business-hour-helper.service';

export interface BusinessHourReservationAddDialogData {
  dates: BusinessHoursDto[];
  reservation: BusinessHourReservationDto;
  isSingleShooter: boolean;
}

@Component({
  selector: 'business-hour-reservation-add-dialog',
  templateUrl: './business-hour-reservation-add-dialog.component.html',
  styleUrls: ['./business-hour-reservation-add-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BusinessHourReservationAddDialogComponent {
  public businessHourList = new Array<BusinessHoursDto>();
  public selectedBusinessHour: BusinessHoursDto | undefined;
  public facilityList = new Array<BusinessHourFacilityTypeSelectionItem>();
  public selectedFacilityType: ReservationFacilityType | undefined;
  public eventList = Object.values(ReservationEventType);
  public selectedEventType: ReservationEventType | undefined;
  public countMax = 0;
  public count = 1;
  public comment = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BusinessHourReservationAddDialogData,
    public dialogRef: MatDialogRef<BusinessHourReservationAddDialogComponent>,
  ) {}

  public dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const isInList = BusinessHourHelperService.isStartInBusinessHourList(cellDate.valueOf(), this.data.dates);
      return isInList ? 'add-date-class' : '';
    }

    return '';
  };

  public dateFilter = (dateMoment: Date | null): boolean => {
    if (!dateMoment || !this.data.dates) {
      return false;
    }

    return BusinessHourHelperService.isStartInBusinessHourList(dateMoment.valueOf(), this.data.dates);
  };

  public onDateChange(event: MatDatepickerInputEvent<any>) {
    this.selectedBusinessHour = undefined;
    this.facilityList = [];
    this.selectedFacilityType = undefined;
    this.selectedEventType = undefined;
    this.count = 1;
    this.countMax = 0;

    this.businessHourList = BusinessHourHelperService.getBusinessHourInListByStart(event.value._d, this.data.dates);
    BusinessHourHelperService.sortBusinessHourListByStart(this.businessHourList);
  }

  public onTimeChange(idString: string) {
    this.selectedFacilityType = undefined;
    this.selectedEventType = undefined;
    this.count = 1;
    this.countMax = 0;

    const id = +idString;
    this.selectedBusinessHour = this.businessHourList.find((current) => {
      return current.id == id;
    });

    if (!this.selectedBusinessHour) {
      return;
    }

    this.facilityList = new Array<BusinessHourFacilityTypeSelectionItem>();

    Object.values(ReservationFacilityType).forEach((type) => {
      const item = new BusinessHourFacilityTypeSelectionItem();
      const occupancy = this.getOccupancy(this.selectedBusinessHour!, type);
      const facilityString = StringHelper.getReservationFacilityTypeString(type);
      item.type = type;
      item.name = facilityString;
      item.full = occupancy.current >= occupancy.max;
      item.count = occupancy.current;
      item.max = occupancy.max;

      this.facilityList.push(item);
    });
  }

  public onFacilityTypeChange(typeString: string) {
    this.selectedFacilityType = typeString as ReservationFacilityType;
    const occupancy = this.getOccupancy(this.selectedBusinessHour!, this.selectedFacilityType);

    this.count = 1;
    this.countMax = occupancy.max - occupancy.current;

    if (this.data.isSingleShooter) {
      this.countMax = BusinessHourHelperService.limitSingleShooterMaxCount(this.selectedFacilityType, this.countMax);
    }

    this.selectedEventType = ReservationEventType.FU;
  }

  public onEventTypeChange(typeString: string) {
    this.selectedEventType = typeString as ReservationEventType;
  }

  public onSubmit() {
    const reservation = new BusinessHourReservationDto();
    reservation.businessHourId = this.selectedBusinessHour!.id;
    reservation.facilityType = this.selectedFacilityType!;
    reservation.count = this.count;
    reservation.eventType = this.selectedEventType!;
    reservation.comment = this.comment;

    this.dialogRef.close(reservation);
  }

  public getTimeString(businessHour: BusinessHoursDto): string {
    return StringHelper.getStartEndTimeString(businessHour.start, businessHour.end);
  }

  public getEventTypeString(eventTypeString: string): string {
    return StringHelper.getEventTypeString(eventTypeString as ReservationEventType);
  }

  public getOccupancyString(): string {
    if (this.selectedFacilityType != undefined) {
      return StringHelper.getOccupancyUnitString(this.selectedFacilityType, this.count);
    } else {
      return '';
    }
  }

  public isFormValid(): boolean {
    if (this.selectedBusinessHour == undefined) {
      return false;
    }
    return (
      this.selectedBusinessHour.id != 0 &&
      this.selectedFacilityType != undefined &&
      this.count >= 1 &&
      this.count <= this.countMax &&
      this.selectedEventType != undefined
    );
  }

  private getOccupancy(businessHour: BusinessHoursDto, type: ReservationFacilityType): BusinessHourOccupancyDto {
    return BusinessHourHelperService.getOccupancy(businessHour, type);
  }
}
