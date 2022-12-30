import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export class DeleteConfirmDialogData {
  itemName = '';
}

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.css'],
})
export class DeleteConfirmDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteConfirmDialogData) {}

  ngOnInit(): void {}
}
