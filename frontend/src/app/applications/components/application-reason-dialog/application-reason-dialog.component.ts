import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-application-reason-dialog',
  templateUrl: './application-reason-dialog.component.html',
  styleUrls: ['./application-reason-dialog.component.css'],
})
export class ApplicationReasonDialogComponent {
  public reason = '';

  constructor(public dialogRef: MatDialogRef<ApplicationReasonDialogComponent>) {}

  public onCancel() {
    this.dialogRef.close();
  }

  public onSubmit() {
    this.dialogRef.close(this.reason);
  }
}
