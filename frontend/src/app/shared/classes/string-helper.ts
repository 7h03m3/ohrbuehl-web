import { Injectable } from '@angular/core';
import { OrganizationMemberDto } from '../dtos/organization-member.dto';

@Injectable({ providedIn: 'root' })
export class StringHelper {
  private localeString = 'de-CH';

  public getDateString(dateNumber: number): string {
    const date = new Date(+dateNumber);
    const days = this.addLeadingZero(date.getDate());
    const month = this.addLeadingZero(date.getMonth() + 1);
    const year = date.getFullYear();
    return days + '.' + month + '.' + year;
  }

  public getStartEndDateString(start: number, end: number): string {
    const startDate = this.getDateString(start);
    const endDate = this.getDateString(end);

    if (startDate == endDate) {
      return startDate;
    }

    return startDate + ' - ' + endDate;
  }

  public getTimeString(dateNumber: number): string {
    const date = new Date(+dateNumber);
    const hours = this.addLeadingZero(date.getHours());
    const minutes = this.addLeadingZero(date.getMinutes());
    return hours + ':' + minutes;
  }

  public getStartEndDateTimeString(start: number, end: number): string {
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

  public getStartEndTimeString(start: number, end: number): string {
    const startTime = this.getTimeString(start);
    const endTime = this.getTimeString(end);

    return startTime + ' - ' + endTime;
  }

  public getDayOfWeekLong(dateNumber: number): string {
    const date = new Date(+dateNumber);
    return date.toLocaleString(this.localeString, { weekday: 'long' });
  }

  public getDayOfWeekShort(dateNumber: number): string {
    const date = new Date(+dateNumber);
    return date.toLocaleString(this.localeString, { weekday: 'short' });
  }

  public getDate(dateString: string, timeString: string): number {
    const temp = timeString.split(':');
    const date = new Date(Date.parse(dateString));

    if (temp[0] != undefined && temp[1] != undefined && temp[2] != undefined) {
      date.setHours(+temp[0], +temp[1], +temp[2]);
    } else if (temp[0] != undefined && temp[1] != undefined) {
      date.setHours(+temp[0], +temp[1]);
    }

    return date.getTime();
  }

  public getDateByDateString(dateString: string): number {
    const dateStringArray = dateString.split('.');

    const date = new Date();
    date.setDate(Number.parseInt(dateStringArray[0]));
    date.setMonth(Number.parseInt(dateStringArray[1]) - 1);
    date.setFullYear(Number.parseInt(dateStringArray[2]));
    return date.getTime();
  }

  public getMemberNameWithSkills(member: OrganizationMemberDto): string {
    if (member == undefined) {
      return '';
    }

    let name = member.firstName + ' ' + member.lastName;

    if (member.rangeOfficer) {
      name = name + ' (SM)';
    }

    return name;
  }

  private addLeadingZero(inputNumber: number): string {
    let input = inputNumber.toString();
    if (input.length < 2) {
      input = '0' + input;
    }

    return input;
  }
}
