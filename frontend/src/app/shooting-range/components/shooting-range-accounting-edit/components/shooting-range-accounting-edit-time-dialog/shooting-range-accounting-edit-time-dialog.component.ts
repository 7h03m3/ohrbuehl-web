import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StringHelper } from '../../../../../shared/classes/string-helper';

export interface ShootingRangeAccountingEditTimeDialogData {
  startTime: number;
  endTime: number;
}

@Component({
  selector: 'app-shooting-range-accounting-edit-time-dialog',
  templateUrl: './shooting-range-accounting-edit-time-dialog.component.html',
  styleUrls: ['./shooting-range-accounting-edit-time-dialog.component.css'],
})
export class ShootingRangeAccountingEditTimeDialogComponent {
  public selectedDate = '';
  public selectedStartTime = '';
  public selectedEndTime = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ShootingRangeAccountingEditTimeDialogData,
    public dialogRef: MatDialogRef<ShootingRangeAccountingEditTimeDialogComponent>,
  ) {}

  public ngOnInit() {
    const date = new Date(+this.data.startTime);
    date.setUTCHours(0, 0, 0, 0);

    this.selectedDate = date.toISOString();
    this.selectedStartTime = StringHelper.getTimeString(this.data.startTime);
    this.selectedEndTime = StringHelper.getTimeString(this.data.endTime);
  }

  public doAssignment() {
    this.data.startTime = StringHelper.getDate(this.selectedDate, this.selectedStartTime);
    this.data.endTime = StringHelper.getDate(this.selectedDate, this.selectedEndTime);
    this.dialogRef.close(this.data);
  }

  public onCancel(): void {
    this.dialogRef.close(this.data);
  }
}
