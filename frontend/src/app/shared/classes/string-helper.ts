import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StringHelper {
  public getDateString(dateNumber: number) {
    const date = new Date(dateNumber);
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
  }
}
