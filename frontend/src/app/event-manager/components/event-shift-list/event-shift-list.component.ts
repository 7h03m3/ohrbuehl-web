import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EventDto } from '../../../shared/dtos/event.dto';
import { EventApi } from '../../../api/classes/event-api';
import { ApiService } from '../../../api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { Router } from '@angular/router';
import { StringHelper } from '../../../shared/classes/string-helper';
import { EventShiftDto } from '../../../shared/dtos/event-shift.dto';

@Component({
  selector: 'app-event-shift-list',
  templateUrl: './event-shift-list.component.html',
  styleUrls: ['./event-shift-list.component.css'],
})
export class EventShiftListComponent {
  eventList$ = new Observable<EventDto[]>();
  displayedColumns: string[] = ['id', 'title', 'category', 'time', 'shift', 'action'];
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

  public onShiftPlaning(element: EventDto) {
    this.router.navigate(['/event-manager/event-shift-edit', { eventId: element.id }]);
  }

  public getTimeString(event: EventDto): string {
    const startDate = this.stringHelper.getDateString(event.start);
    const endDate = this.stringHelper.getDateString(event.end);
    const startTime = this.stringHelper.getTimeString(event.start);
    const endTime = this.stringHelper.getTimeString(event.end);

    if (startDate == endDate) {
      return startDate + ' ' + startTime + ' - ' + endTime;
    } else {
      return startDate + ' ' + startTime + ' - ' + ' ' + endDate + ' ' + endTime;
    }
  }

  public getShiftString(event: EventDto): string {
    let totalCount = 0;
    let assignedCount = 0;

    if (event.shifts != undefined) {
      totalCount = event.shifts.length;

      event.shifts.forEach((shift) => {
        if (this.isAssigned(shift) == true) {
          assignedCount = assignedCount + 1;
        }
      });
    }
    return assignedCount + ' / ' + totalCount;
  }

  public isAssigned(shift: EventShiftDto): boolean {
    return (
      shift.assignedStaffId != null &&
      shift.assignedStaffId != 0 &&
      shift.organizationId != null &&
      shift.organizationId != 0
    );
  }

  private fetch() {
    this.eventList$ = this.eventApi.getAllWithShifts();
  }
}
