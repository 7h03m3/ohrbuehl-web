import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StringHelper {
  public getDateString(dateNumber: number) {
    const date = new Date(+dateNumber);
    const days = this.addLeadingZero(date.getDate());
    const month = this.addLeadingZero(date.getMonth() + 1);
    const year = date.getFullYear();
    return days + '.' + month + '.' + year;
  }

  public getTimeString(dateNumber: number) {
    const date = new Date(+dateNumber);
    const hours = this.addLeadingZero(date.getHours());
    const minutes = this.addLeadingZero(date.getMinutes());
    return hours + ':' + minutes;
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

  private addLeadingZero(inputNumber: number): string {
    let input = inputNumber.toString();
    if (input.length < 2) {
      input = '0' + input;
    }

    return input;
  }
}
