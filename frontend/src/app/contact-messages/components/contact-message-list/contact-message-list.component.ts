import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ContactMessageApi } from '../../../api/contact-message-api';
import { ContactMessageDto } from '../../../shared/dtos/contact-message.dto';
import { StringHelper } from '../../../shared/classes/string-helper';
import { ContactMessageStatus } from '../../../shared/enums/contact-message-status.enum';
import { MatDialog } from '@angular/material/dialog';
import { ContactMessageDialogComponent } from '../contact-message-dialog/contact-message-dialog.component';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-contact-message-list',
  templateUrl: './contact-message-list.component.html',
  styleUrls: ['./contact-message-list.component.css'],
})
export class ContactMessageListComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<ContactMessageDto>();
  public displayedColumns: string[] = ['date', 'firstname', 'lastname', 'subject', 'status', 'action'];
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  protected readonly ContactMessageStatus = ContactMessageStatus;

  constructor(
    private messageApi: ContactMessageApi,
    private dialog: MatDialog,
    private notificationService: NotificationService,
  ) {}

  public ngOnInit() {
    this.loadData();
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getDateString(element: ContactMessageDto): string {
    return StringHelper.getDateString(element.date) + ' ' + StringHelper.getTimeString(element.date);
  }

  public getStatusIcon(element: ContactMessageDto): string {
    switch (element.status) {
      default:
      case ContactMessageStatus.Open:
        return 'highlight_off';
      case ContactMessageStatus.InProcess:
        return 'pending';
      case ContactMessageStatus.Done:
        return 'done';
    }
  }

  public getStatusTooltip(element: ContactMessageDto): string {
    switch (element.status) {
      default:
      case ContactMessageStatus.Open:
        return 'Offen';
      case ContactMessageStatus.InProcess:
        return 'In Bearbeitung';
      case ContactMessageStatus.Done:
        return 'Erledigt';
    }
  }

  public onView(element: ContactMessageDto) {
    this.dialog.open(ContactMessageDialogComponent, {
      data: element,
    });
  }

  public onSetStatusOpen(element: ContactMessageDto) {
    this.setStatus(element, ContactMessageStatus.Open);
  }

  public onSetStatusInProcess(element: ContactMessageDto) {
    this.setStatus(element, ContactMessageStatus.InProcess);
  }

  public onSetStatusDone(element: ContactMessageDto) {
    this.setStatus(element, ContactMessageStatus.Done);
  }

  public onDelete(element: ContactMessageDto) {
    this.messageApi.delete(element.id).subscribe(() => {
      this.loadData();
    });
  }

  private setStatus(element: ContactMessageDto, status: ContactMessageStatus) {
    element.status = status;
    this.messageApi.setStatus(element).subscribe(() => {
      this.loadData();
    });
  }

  private loadData() {
    this.messageApi.getAll().subscribe((response) => {
      this.dataSource.data = response;
      this.notificationService.update();
    });
  }
}
