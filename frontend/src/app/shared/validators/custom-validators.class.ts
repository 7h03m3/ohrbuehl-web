import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

export class CustomValidators {
  public static isDateInFuture(control: AbstractControl): Observable<ValidationErrors | null> {
    const now = Date.now();
    if (control.value < now) {
      return of({ inPast: true });
    }

    return of(null);
  }

  public static isDateOlderThenTwoYears(control: AbstractControl): Observable<ValidationErrors | null> {
    const date = CustomValidators.getValue(control);
    return CustomValidators.isDateOlderThanYear(date, 2);
  }

  public static isAdult(control: AbstractControl): Observable<ValidationErrors | null> {
    const date = CustomValidators.getValue(control);
    return CustomValidators.isDateOlderThanYear(date, 18, true);
  }

  private static isDateOlderThanYear(date: Date, yearDiff: number, invert = false) {
    const limit = new Date(Date.now());

    limit.setHours(0, 0, 0, 0);
    limit.setFullYear(limit.getFullYear() - yearDiff);

    const expired = invert ? date.getTime() > limit.getTime() : date.getTime() < limit.getTime();
    if (expired) {
      return of({ isExpired: true });
    }

    return of(null);
  }

  private static getValue(control: AbstractControl): Date {
    if (typeof control.value == 'string') {
      return new Date(+control.value);
    } else if (control.value instanceof Date) {
      return control.value;
    } else {
      // Moment
      return new Date(control.value.toDate());
    }
  }
}
