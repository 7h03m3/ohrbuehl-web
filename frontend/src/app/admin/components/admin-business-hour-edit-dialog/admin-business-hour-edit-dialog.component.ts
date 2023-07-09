import { Component, Inject } from '@angular/core';
import { BusinessHoursDto } from '../../../shared/dtos/business-hours.dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StringHelper } from '../../../shared/classes/string-helper';

export interface AdminBusinessHourEditDialogData {
  businessHours: BusinessHoursDto;
}

@Component({
  selector: 'app-admin-business-hour-edit-dialog',
  templateUrl: './admin-business-hour-edit-dialog.component.html',
  styleUrls: ['./admin-business-hour-edit-dialog.component.css'],
})
export class AdminBusinessHourEditDialogComponent {
  public date = '';
  public startTime = '';
  public endTime = '';

  constructor(
    public dialogRef: MatDialogRef<AdminBusinessHourEditDialogComponent>,
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
