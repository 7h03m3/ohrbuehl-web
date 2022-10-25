import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

export class BullerPriceDeleteDialogData {
  name: string = "";
}


@Component({
  selector: 'app-admin-bullet-price-delete-dialog',
  templateUrl: './admin-bullet-price-delete-dialog.component.html',
  styleUrls: ['./admin-bullet-price-delete-dialog.component.css']
})
export class AdminBulletPriceDeleteDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: BullerPriceDeleteDialogData) {
  }

  ngOnInit(): void {
  }

}
