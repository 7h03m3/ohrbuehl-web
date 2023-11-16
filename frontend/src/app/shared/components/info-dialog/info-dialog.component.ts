import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export class InfoDialogData {
  text = '';
  title = 'Information';
}

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css'],
})
export class InfoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: InfoDialogData) {}

  ngOnInit(): void {
    if (this.data.title == undefined) {
      this.data.title = 'Information';
    }
  }
}
