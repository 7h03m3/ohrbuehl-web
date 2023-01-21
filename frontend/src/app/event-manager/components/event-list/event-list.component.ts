import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { Router } from '@angular/router';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { EventDto } from '../../../shared/dtos/event.dto';
import { EventApi } from '../../../api/classes/event-api';
import { StringHelper } from '../../../shared/classes/string-helper';
import { InfoDialogComponent } from '../../../shared/components/info-dialog/info-dialog.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent {
  eventList$ = new Observable<EventDto[]>();
  displayedColumns: string[] = ['date', 'time', 'day', 'title', 'category', 'public', 'action'];
  private eventApi: EventApi;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private userLocalData: UserLocalData,
    private router: Router,
    private stringHelper: StringHelper,
  ) {
    this.eventApi = this.apiService.getEvent();
  }

  public ngOnInit(): void {
    this.fetch();
  }

  public onInfo(element: EventDto) {
    this.dialog.open(InfoDialogComponent, {
      data: {
        text: element.publicInformation,
      },
    });
  }

  public onDelete(element: EventDto) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        itemName:
          element.title +
          ' (' +
          this.stringHelper.getDateString(element.start) +
          ' ' +
          this.stringHelper.getTimeString(element.start) +
          ')',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eventApi.delete(element.id).subscribe((data) => this.fetch());
      }
    });
  }

  public onEdit(element: EventDto) {
    this.router.navigate(['/event-manager/event-edit', { id: element.id }]);
  }

  public onCreate() {
    this.router.navigate(['/event-manager/event-edit']);
  }

  public getDateString(event: EventDto): string {
    return this.stringHelper.getStartEndDateString(event.start, event.end);
  }

  public getTimeString(event: EventDto): string {
    return this.stringHelper.getStartEndTimeString(event.start, event.end);
  }

  public getDayString(event: EventDto): string {
    return this.stringHelper.getDayOfWeekShort(event.start);
  }

  private fetch() {
    this.eventList$ = this.eventApi.getAll();
  }
}
