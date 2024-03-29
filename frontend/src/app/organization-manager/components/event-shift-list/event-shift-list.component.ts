import { Component } from '@angular/core';
import { EventApi } from '../../../api/classes/event-api';
import { ApiService } from '../../../api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { Router } from '@angular/router';
import { StringHelper } from '../../../shared/classes/string-helper';
import { EventShiftDto } from '../../../shared/dtos/event-shift.dto';
import { EventShiftListItemDto } from './dtos/event-shift-list-item.dto';
import { EventStaffPoolApi } from '../../../api/classes/event-staff-pool-api';
import { AuthService } from '../../../auth/auth.service';
import { EventCategoryDto } from '../../../shared/dtos/event-category.dto';
import { EventCategoryApi } from '../../../api/classes/event-category-api';

@Component({
  selector: 'app-event-shift-list',
  templateUrl: './event-shift-list.component.html',
  styleUrls: ['./event-shift-list.component.css'],
})
export class EventShiftListComponent {
  public eventList = new Array<EventShiftListItemDto>();
  public displayedColumns: string[] = ['time', 'day', 'title', 'category', 'shift', 'rangeOfficer', 'pool', 'action'];
  public categoryList = new Array<EventCategoryDto>();
  public selectedCategory = 0;
  private organizationId = 0;
  private eventApi: EventApi;
  private poolApi: EventStaffPoolApi;
  private categoryApi: EventCategoryApi;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private userLocalData: UserLocalData,
    private router: Router,
    private authService: AuthService,
  ) {
    this.eventApi = this.apiService.getEvent();
    this.poolApi = this.apiService.getStaffPool();
    this.categoryApi = this.apiService.getEventCategory();
  }

  private static isAssigned(shift: EventShiftDto): boolean {
    return (
      shift.assignedStaffId != null &&
      shift.assignedStaffId != 0 &&
      shift.organizationId != null &&
      shift.organizationId != 0
    );
  }

  public ngOnInit(): void {
    this.selectedCategory = this.userLocalData.getEventCategory();
    this.organizationId = this.authService.getManagingOrganizationId();

    this.fetch();
  }

  public onShiftPlaning(element: EventShiftListItemDto) {
    this.router.navigate(['/organization-manager/event-shift-edit', { eventId: element.event.id }]);
  }

  public getTimeString(element: EventShiftListItemDto): string {
    return StringHelper.getStartEndDateTimeString(element.event.start, element.event.end);
  }

  public getDayString(element: EventShiftListItemDto): string {
    return StringHelper.getDayOfWeekShort(element.event.start);
  }

  public isShiftAssignmentOkay(element: EventShiftListItemDto): boolean {
    return element.totalShifts == element.assignedShifts;
  }

  public isRangeOfficerAssignmentOkay(element: EventShiftListItemDto): boolean {
    return element.totalRangeOfficer == element.assignedRangeOfficer;
  }

  public isShiftPlanningPossible(element: EventShiftListItemDto): boolean {
    return element.totalShifts != 0;
  }

  public onCategoryChange(categoryId: number) {
    this.userLocalData.setEventCategory(categoryId);
    this.selectedCategory = categoryId;
    this.fetch();
  }

  private fetch() {
    this.categoryList = new Array<EventCategoryDto>();

    const allCategory = new EventCategoryDto();
    allCategory.name = 'Alle';
    this.categoryList.push(allCategory);

    this.eventApi.getAllWithShiftsByOrganizationId(this.organizationId).subscribe((response) => {
      this.eventList = new Array<EventShiftListItemDto>();
      response.forEach((event) => {
        if (this.selectedCategory == 0 || event.categoryId == this.selectedCategory) {
          const element = new EventShiftListItemDto();
          element.event = event;

          if (event.shifts != undefined) {
            element.totalShifts = event.shifts.length;
            const rangeOfficerShiftList = event.shifts.filter((value) => {
              return value.category.requiresRangeOfficer;
            });
            const assignedRangeOfficerShiftList = event.shifts.filter((value) => {
              return value.category.requiresRangeOfficer && value.assignedStaffId != null;
            });
            element.totalRangeOfficer = rangeOfficerShiftList.length;
            element.assignedRangeOfficer = assignedRangeOfficerShiftList.length;

            event.shifts.forEach((shift) => {
              if (EventShiftListComponent.isAssigned(shift)) {
                element.assignedShifts = element.assignedShifts + 1;
              }
            });
          }

          this.poolApi.getAllByOrganizationAndEvent(this.organizationId, event.id).subscribe((poolList) => {
            element.totalInPool = poolList.length;
          });

          this.eventList.push(element);
        }

        const existingCategory = this.categoryList.find((value) => value.id == event.categoryId);
        if (!existingCategory) {
          this.categoryList.push(event.category);
        }
      });
    });
  }
}
