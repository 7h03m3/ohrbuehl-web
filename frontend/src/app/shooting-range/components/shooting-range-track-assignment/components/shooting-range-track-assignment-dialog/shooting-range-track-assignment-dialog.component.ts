import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrganizationDto } from '../../../../../shared/dtos/organization.dto';
import { ShootingRangePriceDto } from '../../../../../shared/dtos/shooting-range-price.dto';

export interface ShootingRangeTrackAssignmentDialogData {
  editShots: boolean;
  amount: number;
  maxTrack: number;
  minTrack: number;
  trackStart: number;
  trackEnd: number;
  priceId: number;
  organizationId: number;
  comment: string;
  organizationList: OrganizationDto[];
  priceList: ShootingRangePriceDto[];
}

@Component({
  selector: 'app-shooting-range-track-assignment-dialog',
  templateUrl: './shooting-range-track-assignment-dialog.component.html',
  styleUrls: ['./shooting-range-track-assignment-dialog.component.css'],
})
export class ShootingRangeTrackAssignmentDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ShootingRangeTrackAssignmentDialogData,
    public dialogRef: MatDialogRef<ShootingRangeTrackAssignmentDialogComponent>,
  ) {}

  public ngOnInit(): void {}

  public doAssignment() {
    this.dialogRef.close(this.data);
  }

  public onCancel(): void {
    this.dialogRef.close(this.data);
  }
}
