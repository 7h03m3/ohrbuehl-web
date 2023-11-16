import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactMessageDto } from '../../../shared/dtos/contact-message.dto';

@Component({
  selector: 'app-contact-message-dialog',
  templateUrl: './contact-message-dialog.component.html',
  styleUrls: ['./contact-message-dialog.component.css'],
})
export class ContactMessageDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ContactMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContactMessageDto,
  ) {}

  public ngOnInit() {
    this.data.message = this.data.message.trim();
  }

  public onClose() {
    this.dialogRef.close();
  }

  public onAnswer() {
    const message = this.data.message.replace(/\n/g, '%0D%0A');
    const mailText = 'mailto:' + this.data.email + '?subject=' + this.data.subject + '&body=' + message;
    window.location.href = mailText;
  }
}
