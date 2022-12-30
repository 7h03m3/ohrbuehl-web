import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export class UserDeleteDialogData {
  firstName = '';
  lastName = '';
}

@Component({
  selector: 'app-admin-user-delete-dialog',
  templateUrl: './admin-user-delete-dialog.component.html',
  styleUrls: ['./admin-user-delete-dialog.component.css'],
})
export class AdminUserDeleteDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: UserDeleteDialogData) {}

  ngOnInit(): void {}
}
