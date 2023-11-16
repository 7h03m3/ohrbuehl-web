import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDto } from '../../../shared/dtos/user.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-account-information-edit-dialog',
  templateUrl: './user-account-information-edit-dialog.component.html',
  styleUrls: ['./user-account-information-edit-dialog.component.css'],
})
export class UserAccountInformationEditDialogComponent implements OnInit {
  public editForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserAccountInformationEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDto,
  ) {}

  public ngOnInit() {
    this.editForm = new FormGroup({
      mobile: new FormControl(this.data.mobile, [
        Validators.required,
        Validators.pattern(/(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/),
      ]),
      firstname: new FormControl(this.data.firstName, [Validators.required]),
      lastname: new FormControl(this.data.lastName, [Validators.required]),
      street: new FormControl(this.data.street, [Validators.required]),
      zip: new FormControl(this.data.zip, [Validators.required, Validators.pattern(/^\d{4}$/)]),
      location: new FormControl(this.data.location, [Validators.required]),
    });
  }

  public onSubmit(): void {
    this.data.firstName = this.editForm.value['firstname'];
    this.data.lastName = this.editForm.value['lastname'];
    this.data.street = this.editForm.value['street'];
    this.data.zip = parseInt(this.editForm.value['zip']);
    this.data.location = this.editForm.value['location'];
    this.data.mobile = this.editForm.value['mobile'];
    this.dialogRef.close(this.data);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public getErrorMessage(controlName: string) {
    const control = this.editForm.get(controlName) as FormControl;

    if (control == undefined) {
      return 'Unbekannter Fehler';
    }

    if (control.valid) {
      return '';
    }

    switch (controlName) {
      case 'required':
        return 'Das Feld ist zwingend';
      case 'zip':
        return '';
      case 'mobile':
        return 'Ungültige Telefonnummer';
      case 'firstname':
        return 'Ungültiger Vorname';
      case 'lastname':
        return 'Ungültiger Nachname';
      case 'street':
        return 'Ungültige Strasse';
      case 'location':
        return 'Ungültiger Ort';
      default:
        return '';
    }
  }

  public isError(fieldName: string): boolean {
    const field = this.editForm.get(fieldName);

    if (field == undefined) {
      return true;
    }

    return field.invalid && field.touched;
  }
}
