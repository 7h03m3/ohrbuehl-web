import { Component, Inject } from '@angular/core';
import { NotificationReceiverDto } from '../../../shared/dtos/notification-receiver.dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationSource } from '../../../shared/enums/notification-source.enum';
import { MatSelectionListChange } from '@angular/material/list';
import { UserLocalData } from '../../../shared/classes/user-local-data';

export interface AdminNotifierEditDialogData {
  notifier: NotificationReceiverDto;
}

@Component({
  selector: 'app-admin-notifier-edit-dialog',
  templateUrl: './admin-notifier-edit-dialog.component.html',
  styleUrls: ['./admin-notifier-edit-dialog.component.css'],
})
export class AdminNotifierEditDialogComponent {
  public formValid = true;
  public triggerSources = Object.values(NotificationSource);

  constructor(
    public dialogRef: MatDialogRef<AdminNotifierEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminNotifierEditDialogData,
  ) {}

  public onSubmit(): void {
    this.dialogRef.close(this.data);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onTriggerChange(event: MatSelectionListChange) {
    event.options.forEach((option) => {
      if (option.selected) {
        this.data.notifier.triggers.push(option.value);
      } else {
        this.data.notifier.triggers = this.data.notifier.triggers.filter((value) => {
          return value != option.value;
        });
      }
    });
  }

  public isTriggerSelected(source: NotificationSource): boolean {
    return this.data.notifier.triggers.includes(source);
  }

  public getNotificationTriggerText(trigger: NotificationSource): string {
    return UserLocalData.convertNotificationSourceText(trigger);
  }
}
