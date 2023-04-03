import { Component, Inject } from '@angular/core';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { ShootingRangePriceDto } from '../../../shared/dtos/shooting-range-price.dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ShootingRangeTrackEditDialogData {
  track: number;
  amount: number;
  priceId: number;
  organizationId: number;
  comment: string;
  organizationList: OrganizationDto[];
  priceList: ShootingRangePriceDto[];
}

@Component({
  selector: 'app-shooting-range-track-edit-dialog',
  templateUrl: './shooting-range-track-edit-dialog.component.html',
  styleUrls: ['./shooting-range-track-edit-dialog.component.css'],
})
export class ShootingRangeTrackEditDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ShootingRangeTrackEditDialogData,
    public dialogRef: MatDialogRef<ShootingRangeTrackEditDialogComponent>,
  ) {}

  public doAssignment() {
    this.dialogRef.close(this.data);
  }

  public onCancel(): void {
    this.dialogRef.close(this.data);
  }
}
