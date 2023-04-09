import { Injectable } from '@nestjs/common';

@Injectable()
export class DateHelper {
  private static localeString = 'de-CH';

  public static getFullYear(dateNumber: number): string {
    const date = DateHelper.getDate(dateNumber);
    return date.getFullYear().toString();
  }

  public static getDateString(dateNumber: number): string {
    const date = new Date(+dateNumber);
    const days = DateHelper.addLeadingZero(date.getDate());
    const month = DateHelper.addLeadingZero(date.getMonth() + 1);
    const year = date.getFullYear();
    return days + '.' + month + '.' + year;
  }

  public static getDayMonthString(dateNumber: number): string {
    const date = new Date(+dateNumber);
    const days = DateHelper.addLeadingZero(date.getDate());
    const month = DateHelper.addLeadingZero(date.getMonth() + 1);
    return days + '.' + month;
  }

  public static getTimeString(dateNumber: number): string {
    const date = new Date(+dateNumber);
    const hours = DateHelper.addLeadingZero(date.getHours());
    const minutes = DateHelper.addLeadingZero(date.getMinutes());
    return hours + ':' + minutes;
  }

  public static getDayOfWeekLong(dateNumber: number): string {
    const date = new Date(+dateNumber);
    return date.toLocaleString(DateHelper.localeString, { weekday: 'long' });
  }

  public static getDayOfWeekShort(dateNumber: number): string {
    const date = new Date(+dateNumber);
    return date.toLocaleString(DateHelper.localeString, { weekday: 'short' });
  }

  public static getStartEndTimeString(start: number, end: number): string {
    const startTime = DateHelper.getTimeString(start);
    const endTime = DateHelper.getTimeString(end);

    return startTime + ' - ' + endTime;
  }

  public static getStartEndDateString(start: number, end: number): string {
    const startDate = DateHelper.getDateString(start);
    const startTime = DateHelper.getTimeString(start);
    const endDate = DateHelper.getDateString(end);
    const endTime = DateHelper.getTimeString(end);

    if (startDate == endDate) {
      return startDate + ' ' + startTime + ' - ' + endTime;
    } else {
      return startDate + ' ' + startTime + ' - ' + endDate + ' ' + endTime;
    }
  }

  public static getDateFileName(dateNumber: number): string {
    const date = DateHelper.getDate(dateNumber);
    return date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate();
  }

  public static getTimeFileName(dateNumber: number): string {
    const date = new Date(+dateNumber);
    const hours = DateHelper.addLeadingZero(date.getHours());
    const minutes = DateHelper.addLeadingZero(date.getMinutes());
    return hours + '_' + minutes;
  }

  private static addLeadingZero(inputNumber: number): string {
    let input = inputNumber.toString();
    if (input.length < 2) {
      input = '0' + input;
    }

    return input;
  }

  private static getDate(dateNumber: number): Date {
    return new Date(parseInt(dateNumber.toString(), 10));
  }
}
