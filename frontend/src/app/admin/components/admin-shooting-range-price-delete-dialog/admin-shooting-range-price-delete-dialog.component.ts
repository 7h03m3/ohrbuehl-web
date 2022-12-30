import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export class BullerPriceDeleteDialogData {
  name = '';
}

@Component({
  selector: 'app-admin-shooting-range-price-delete-dialog',
  templateUrl: './admin-shooting-range-price-delete-dialog.component.html',
  styleUrls: ['./admin-shooting-range-price-delete-dialog.component.css'],
})
export class AdminShootingRangePriceDeleteDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: BullerPriceDeleteDialogData) {}

  ngOnInit(): void {}
}
