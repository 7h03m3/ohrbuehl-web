import { Component, Inject } from '@angular/core';
import { OrganizationDto } from '../../../../shared/dtos/organization.dto';
import { ShootingRangePriceDto } from '../../../../shared/dtos/shooting-range-price.dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ShootingRangeEditTrackDialogData {
  track: number;
  priceId: number;
  organizationId: number;
  comment: string;
  organizationList: OrganizationDto[];
  priceList: ShootingRangePriceDto[];
}

@Component({
  selector: 'app-shooting-range-edit-track-dialog',
  templateUrl: './shooting-range-edit-track-dialog.component.html',
  styleUrls: ['./shooting-range-edit-track-dialog.component.css'],
})
export class ShootingRangeEditTrackDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ShootingRangeEditTrackDialogData,
    public dialogRef: MatDialogRef<ShootingRangeEditTrackDialogComponent>,
  ) {}

  public doAssignment() {
    this.dialogRef.close(this.data);
  }

  public onCancel(): void {
    this.dialogRef.close(this.data);
  }
}
