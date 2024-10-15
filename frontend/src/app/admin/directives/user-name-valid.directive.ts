import { Directive } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { debounceTime, map, Observable } from 'rxjs';
import { UserApi } from '../../api/user-api';

@Directive({
  selector: '[appUserNameValid]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UserNameValidDirective,
      multi: true,
    },
  ],
})
export class UserNameValidDirective implements Validator {
  constructor(private userService: UserApi) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> | null {
    const value: string = control.value;

    return this.userService.checkUsername(value).pipe(
      debounceTime(5000),
      map((data: boolean) => {
        if (data) {
          return { exists: true };
        }

        return null;
      }),
    );
  }
}
