import { Component, Inject } from '@angular/core';
import { BusinessHoursDto } from '../../../shared/dtos/business-hours.dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StringHelper } from '../../../shared/classes/string-helper';

export interface AdminBusinessHourEditDialogData {
  businessHours: BusinessHoursDto;
}

@Component({
  selector: 'business-hour-admin-edit-dialog',
  templateUrl: './business-hour-admin-edit-dialog.component.html',
  styleUrls: ['./business-hour-admin-edit-dialog.component.css'],
})
export class BusinessHourAdminEditDialogComponent {
  public date = '';
  public startTime = '';
  public endTime = '';

  constructor(
    public dialogRef: MatDialogRef<BusinessHourAdminEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminBusinessHourEditDialogData,
  ) {}

  public ngOnInit() {
    this.startTime = StringHelper.getTimeString(this.data.businessHours.start);
    this.endTime = StringHelper.getTimeString(this.data.businessHours.end);

    const date = new Date(+this.data.businessHours.start);
    date.setUTCHours(0, 0, 0, 0);
    this.date = date.toISOString();
  }

  public onSubmit(): void {
    this.data.businessHours.start = StringHelper.getDate(this.date, this.startTime);
    this.data.businessHours.end = StringHelper.getDate(this.date, this.endTime);
    this.dialogRef.close(this.data);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public isFormValid(): boolean {
    const start = StringHelper.getDate(this.date, this.startTime);
    const end = StringHelper.getDate(this.date, this.endTime);
    return start < end;
  }
}
