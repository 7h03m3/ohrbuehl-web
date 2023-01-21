import { Injectable } from '@nestjs/common';

@Injectable()
export class DateHelper {
  private localeString = 'de-CH';

  public getDateString(dateNumber: number): string {
    const date = new Date(+dateNumber);
    const days = this.addLeadingZero(date.getDate());
    const month = this.addLeadingZero(date.getMonth() + 1);
    const year = date.getFullYear();
    return days + '.' + month + '.' + year;
  }

  public getDayMonthString(dateNumber: number): string {
    const date = new Date(+dateNumber);
    const days = this.addLeadingZero(date.getDate());
    const month = this.addLeadingZero(date.getMonth() + 1);
    return days + '.' + month;
  }

  public getTimeString(dateNumber: number): string {
    const date = new Date(+dateNumber);
    const hours = this.addLeadingZero(date.getHours());
    const minutes = this.addLeadingZero(date.getMinutes());
    return hours + ':' + minutes;
  }

  public getDayOfWeekLong(dateNumber: number): string {
    const date = new Date(+dateNumber);
    return date.toLocaleString(this.localeString, { weekday: 'long' });
  }

  public getDayOfWeekShort(dateNumber: number): string {
    const date = new Date(+dateNumber);
    return date.toLocaleString(this.localeString, { weekday: 'short' });
  }

  public getStartEndDateString(start: number, end: number): string {
    const startDate = this.getDateString(start);
    const startTime = this.getTimeString(start);
    const endDate = this.getDateString(end);
    const endTime = this.getTimeString(end);

    if (startDate == endDate) {
      return startDate + ' ' + startTime + ' - ' + endTime;
    } else {
      return startDate + ' ' + startTime + ' - ' + endDate + ' ' + endTime;
    }
  }

  public getDateFileName(dateNumber: number): string {
    const date = this.getDate(dateNumber);
    return date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate();
  }

  public getFullYear(dateNumber: number): string {
    const date = this.getDate(dateNumber);
    return date.getFullYear().toString();
  }

  private getDate(dateNumber: number): Date {
    return new Date(parseInt(dateNumber.toString(), 10));
  }

  private addLeadingZero(inputNumber: number): string {
    let input = inputNumber.toString();
    if (input.length < 2) {
      input = '0' + input;
    }

    return input;
  }
}
