import { Injectable } from '@angular/core';
import { OrganizationMemberDto } from '../dtos/organization-member.dto';
import { UserLocalData } from './user-local-data';
import { NotificationSource } from '../enums/notification-source.enum';
import { BusinessHourOccupancyDto } from '../dtos/business-hour-occupancy.dto';
import { ReservationFacilityType } from '../enums/reservation-facility-type.enum';
import { ReservationEventType } from '../enums/reservation-event-type.enum';

@Injectable({ providedIn: 'root' })
export class StringHelper {
  private static localeString = 'de-CH';

  public static getDateString(dateNumber: number): string {
    const date = new Date(+dateNumber);
    const days = this.addLeadingZero(date.getDate());
    const month = this.addLeadingZero(date.getMonth() + 1);
    const year = date.getFullYear();
    return days + '.' + month + '.' + year;
  }

  public static getStartEndDateString(start: number, end: number): string {
    const startDate = this.getDateString(start);
    const endDate = this.getDateString(end);

    if (startDate == endDate) {
      return startDate;
    }

    return startDate + ' - ' + endDate;
  }

  public static getTimeString(dateNumber: number): string {
    const date = new Date(+dateNumber);
    const hours = this.addLeadingZero(date.getHours());
    const minutes = this.addLeadingZero(date.getMinutes());
    return hours + ':' + minutes;
  }

  public static getStartEndDateTimeString(start: number, end: number): string {
    const startDate = this.getDateString(start);
    const endDate = this.getDateString(end);
    const startTime = this.getTimeString(start);
    const endTime = this.getTimeString(end);

    if (startDate == endDate) {
      return startDate + ' ' + startTime + ' - ' + endTime;
    } else {
      return startDate + ' ' + startTime + ' - ' + ' ' + endDate + ' ' + endTime;
    }
  }

  public static getStartEndTimeString(start: number, end: number): string {
    const startTime = this.getTimeString(start);
    const endTime = this.getTimeString(end);

    return startTime + ' - ' + endTime;
  }

  public static getDayOfWeekLong(dateNumber: number): string {
    const date = new Date(+dateNumber);
    return date.toLocaleString(this.localeString, { weekday: 'long' });
  }

  public static getDayOfWeekShort(dateNumber: number): string {
    const date = new Date(+dateNumber);
    return date.toLocaleString(this.localeString, { weekday: 'short' });
  }

  public static getDate(dateString: string, timeString: string): number {
    const temp = timeString.split(':');
    const date = new Date(Date.parse(dateString));

    if (temp[0] != undefined && temp[1] != undefined && temp[2] != undefined) {
      date.setHours(+temp[0], +temp[1], +temp[2]);
    } else if (temp[0] != undefined && temp[1] != undefined) {
      date.setHours(+temp[0], +temp[1]);
    }

    return date.getTime();
  }

  public static getDateByDateString(dateString: string): number {
    const dateStringArray = dateString.split('.');

    const date = new Date();
    date.setDate(Number.parseInt(dateStringArray[0]));
    date.setMonth(Number.parseInt(dateStringArray[1]) - 1);
    date.setFullYear(Number.parseInt(dateStringArray[2]));
    return date.getTime();
  }

  public static getMemberNameWithSkills(member: OrganizationMemberDto): string {
    if (member == undefined) {
      return '';
    }

    let name = member.firstName + ' ' + member.lastName;

    if (member.rangeOfficer) {
      name = name + ' (SM)';
    }

    return name;
  }

  public static getNotificationTriggerText(sourceList: NotificationSource[]): string {
    let returnString = '';

    sourceList.forEach((trigger) => {
      if (returnString.length != 0) {
        returnString += ', ';
      }

      returnString += UserLocalData.convertNotificationSourceText(trigger);
    });

    return returnString;
  }

  public static getOccupancyString(occupancy: BusinessHourOccupancyDto): string {
    return occupancy.current + ' / ' + occupancy.max;
  }

  public static getOccupanciesString(
    occupancy1: BusinessHourOccupancyDto,
    occupancy2: BusinessHourOccupancyDto,
  ): string {
    const current = occupancy1.current + occupancy2.current;
    const max = occupancy1.max + occupancy2.max;
    return current + ' / ' + max;
  }

  public static getReservationFacilityTypeString(type: ReservationFacilityType): string {
    switch (type) {
      case ReservationFacilityType.Distance300m:
        return '300m';
      case ReservationFacilityType.Distance100m:
        return '100m';
      case ReservationFacilityType.Distance50mElectronic:
        return '50m - elektronisch';
      case ReservationFacilityType.Distance50mManuel:
        return '50m - manuell';
      case ReservationFacilityType.Distance25mBlockManuel:
        return '25m-Block - manuell';
      case ReservationFacilityType.Distance25mBlockElectronic:
        return '25m-Block - elektronisch';
    }
  }

  public static getReservationFacilityTypeSimpleString(type: ReservationFacilityType): string {
    switch (type) {
      case ReservationFacilityType.Distance300m:
        return '300m';
      case ReservationFacilityType.Distance100m:
        return '100m';
      case ReservationFacilityType.Distance50mElectronic:
      case ReservationFacilityType.Distance50mManuel:
        return '50m';
      case ReservationFacilityType.Distance25mBlockManuel:
      case ReservationFacilityType.Distance25mBlockElectronic:
        return '25m';
    }
  }

  public static getEventTypeString(type: ReservationEventType): string {
    switch (type) {
      case ReservationEventType.BU:
        return 'Bundesübung';
      case ReservationEventType.FS:
        return 'Feldschiessen';
      case ReservationEventType.JS:
        return 'Jungschützenkurs';
      case ReservationEventType.FU:
        return 'Freie Übung';
      case ReservationEventType.Event:
        return 'Anlass';
      case ReservationEventType.Other:
        return 'Anderes';
    }
  }

  public static getEventTypeSimpleString(type: ReservationEventType): string {
    switch (type) {
      case ReservationEventType.BU:
        return 'BU';
      case ReservationEventType.FS:
        return 'FS';
      case ReservationEventType.JS:
        return 'JS';
      case ReservationEventType.FU:
        return 'FU';
      case ReservationEventType.Event:
        return 'Anlass';
      case ReservationEventType.Other:
        return 'Anderes';
    }
  }

  private static addLeadingZero(inputNumber: number): string {
    let input = inputNumber.toString();
    if (input.length < 2) {
      input = '0' + input;
    }

    return input;
  }
}
