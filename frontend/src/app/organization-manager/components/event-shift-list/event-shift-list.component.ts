import { Component } from '@angular/core';
import { EventApi } from '../../../api/classes/event-api';
import { ApiService } from '../../../api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { Router } from '@angular/router';
import { StringHelper } from '../../../shared/classes/string-helper';
import { EventShiftDto } from '../../../shared/dtos/event-shift.dto';
import { EventShiftListItemDto } from './dtos/event-shift-list-item.dto';
import { OrganizationApi } from '../../../api/classes/organization-api';

@Component({
  selector: 'app-event-shift-list',
  templateUrl: './event-shift-list.component.html',
  styleUrls: ['./event-shift-list.component.css'],
})
export class EventShiftListComponent {
  eventList = new Array<EventShiftListItemDto>();
  displayedColumns: string[] = ['time', 'title', 'category', 'shift', 'action'];
  private organizationId = 0;
  private eventApi: EventApi;
  private organizationApi: OrganizationApi;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private userLocalData: UserLocalData,
    private router: Router,
    private userData: UserLocalData,
    private stringHelper: StringHelper,
  ) {
    this.eventApi = this.apiService.getEvent();
    this.organizationApi = this.apiService.getOrganization();
  }

  public ngOnInit(): void {
    this.organizationApi.getByManagerId(this.userData.getUserId()).subscribe((response) => {
      this.organizationId = response.id;
      this.fetch();
    });
  }

  public onShiftPlaning(element: EventShiftListItemDto) {
    this.router.navigate(['/organization-manager/event-shift-edit', { eventId: element.event.id }]);
  }

  public getTimeString(element: EventShiftListItemDto): string {
    const startDate = this.stringHelper.getDateString(element.event.start);
    const endDate = this.stringHelper.getDateString(element.event.end);
    const startTime = this.stringHelper.getTimeString(element.event.start);
    const endTime = this.stringHelper.getTimeString(element.event.end);

    if (startDate == endDate) {
      return startDate + ' ' + startTime + ' - ' + endTime;
    } else {
      return startDate + ' ' + startTime + ' - ' + ' ' + endDate + ' ' + endTime;
    }
  }

  public isShiftAssignmentOkay(element: EventShiftListItemDto): boolean {
    return element.totalShifts == element.assignedShifts;
  }

  public isShiftPlanningPossible(element: EventShiftListItemDto): boolean {
    return element.totalShifts != 0;
  }

  private isAssigned(shift: EventShiftDto): boolean {
    return (
      shift.assignedStaffId != null &&
      shift.assignedStaffId != 0 &&
      shift.organizationId != null &&
      shift.organizationId != 0
    );
  }

  private fetch() {
    this.eventApi.getAllWithShiftsByOrganizationId(this.organizationId).subscribe((response) => {
      this.eventList = new Array<EventShiftListItemDto>();

      response.forEach((event) => {
        const element = new EventShiftListItemDto();
        element.event = event;

        if (event.shifts != undefined) {
          element.totalShifts = event.shifts.length;

          event.shifts.forEach((shift) => {
            if (this.isAssigned(shift) == true) {
              element.assignedShifts = element.assignedShifts + 1;
            }
          });
        }

        this.eventList.push(element);
      });
    });
  }
}
