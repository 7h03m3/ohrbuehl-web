import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NotificationReceiverDto } from '../../../shared/dtos/notification-receiver.dto';
import { NotificationApi } from '../../../api/classes/notification-api';
import { ApiService } from '../../../api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminNotifierEditDialogComponent } from '../admin-notifier-edit-dialog/admin-notifier-edit-dialog.component';
import { StringHelper } from '../../../shared/classes/string-helper';

@Component({
  selector: 'app-admin-notifier-list',
  templateUrl: './admin-notifier-list.component.html',
  styleUrls: ['./admin-notifier-list.component.css'],
})
export class AdminNotifierListComponent {
  public dataSource = new MatTableDataSource<NotificationReceiverDto>();
  public displayedColumns: string[] = ['name', 'email', 'triggers', 'action'];
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  private notificationApi: NotificationApi;

  constructor(private apiService: ApiService, public dialog: MatDialog, private router: Router) {
    this.notificationApi = this.apiService.getNotification();
  }

  public ngOnInit(): void {
    this.fetch();
  }

  public onCreate() {
    const element = new NotificationReceiverDto();
    this.openEditDialog(element);
  }

  public onEdit(element: NotificationReceiverDto) {
    this.openEditDialog(element);
  }

  public getNotificationTriggerText(element: NotificationReceiverDto): string {
    return StringHelper.getNotificationTriggerText(element.triggers);
  }

  private fetch() {
    this.notificationApi.getAllNotifier().subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  private openEditDialog(element: NotificationReceiverDto) {
    const dialogRef = this.dialog.open(AdminNotifierEditDialogComponent, {
      data: {
        notifier: element,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data != undefined) {
        if (data.notifier.id == 0) {
          this.notificationApi.createNotifier(data.notifier).subscribe((data) => {
            this.fetch();
          });
        } else {
          this.notificationApi.updateNotifier(data.notifier).subscribe((data) => {
            this.fetch();
          });
        }
      }
    });
  }
}
