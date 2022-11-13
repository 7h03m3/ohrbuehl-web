import { Injectable } from '@nestjs/common';

@Injectable()
export class DateHelper {
  public getDateString(dateNumber: number): string {
    const date = this.getDate(dateNumber);
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
  }

  public getDateFileName(dateNumber: number): string {
    const date = this.getDate(dateNumber);
    return date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate();
  }

  private getDate(dateNumber: number): Date {
    return new Date(parseInt(dateNumber.toString(), 10));
  }
}
