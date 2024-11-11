import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserLocalData } from '../../../../../shared/classes/user-local-data';

export class ShootingRangeReportYearDialogData {
  year = 0;
}

@Component({
  selector: 'app-shooting-rang-report-year-dialog',
  templateUrl: './shooting-rang-report-year-dialog.component.html',
  styleUrls: ['./shooting-rang-report-year-dialog.component.css'],
})
export class ShootingRangReportYearDialogComponent {
  private static YearRange = 10;
  public yearList = new Array<number>();
  public data = new ShootingRangeReportYearDialogData();

  constructor(
    public dialogRef: MatDialogRef<ShootingRangReportYearDialogComponent>,
    private userLocalData: UserLocalData,
  ) {}

  public ngOnInit() {
    this.data.year = this.userLocalData.getCurrentYear();

    for (
      let i = -1 * ShootingRangReportYearDialogComponent.YearRange;
      i <= ShootingRangReportYearDialogComponent.YearRange;
      i++
    ) {
      this.yearList.push(this.data.year + i);
    }
  }

  public onSubmit() {
    this.dialogRef.close(this.data);
  }
}
