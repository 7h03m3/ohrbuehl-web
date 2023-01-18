import { Injectable } from '@nestjs/common';

@Injectable()
export class DateHelper {
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
