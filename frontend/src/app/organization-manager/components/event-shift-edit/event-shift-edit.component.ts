import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StringHelper } from '../../../shared/classes/string-helper';
import { EventApi } from '../../../api/event-api';
import { EventShiftApi } from '../../../api/event-shift-api';
import { OrganizationMemberDto } from '../../../shared/dtos/organization-member.dto';
import { EventDto } from '../../../shared/dtos/event.dto';
import { EventShiftDto } from '../../../shared/dtos/event-shift.dto';
import { catchError, EMPTY } from 'rxjs';
import { EventStaffPoolApi } from '../../../api/event-staff-pool-api';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-event-shift-edit',
  templateUrl: './event-shift-edit.component.html',
  styleUrls: ['./event-shift-edit.component.css'],
})
export class EventShiftEditComponent {
  public eventData = new EventDto();
  public shiftList = new Array<EventShiftDto>();
  public staffList = new Array<OrganizationMemberDto>();
  public displayedColumns: string[] = ['category', 'time', 'staff', 'action'];
  private organizationId = 0;
  private eventId = 0;

  constructor(
    private eventApi: EventApi,
    private shiftApi: EventShiftApi,
    private staffPoolApi: EventStaffPoolApi,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  public ngOnInit(): void {
    this.organizationId = this.authService.getManagingOrganizationId();

    this.route.paramMap.subscribe((data) => {
      const idString = data.get('eventId');

      if (idString != null) {
        this.eventId = Number(idString);

        this.eventApi.getById(this.eventId).subscribe((data) => {
          this.eventData = data;
        });

        this.staffPoolApi.getAllByOrganizationAndEvent(this.organizationId, this.eventId).subscribe((poolList) => {
          this.staffList = new Array<OrganizationMemberDto>();

          const nonSelected = new OrganizationMemberDto();
          nonSelected.firstName = '-';
          nonSelected.organizationId = 0;

          this.staffList.push(nonSelected);

          poolList.forEach((poolEntry) => {
            this.staffList.push(poolEntry.member);
          });

          this.fetch();
        });
      }
    });
  }

  public getTimeString(event: EventDto): string {
    return StringHelper.getStartEndDateTimeString(event.start, event.end);
  }

  public getShiftTimeString(shift: EventShiftDto): string {
    return StringHelper.getStartEndTimeString(shift.start, shift.end);
  }

  public isShiftEditable(element: EventShiftDto): boolean {
    return !this.isShiftDone(element) && !this.isShiftLocked(element);
  }

  public isShiftDone(element: EventShiftDto): boolean {
    return element.done;
  }

  public isShiftLocked(element: EventShiftDto): boolean {
    return element.locked;
  }

  public isShiftPresent(element: EventShiftDto): boolean {
    return this.isShiftDone(element) && element.present;
  }

  public onChangeStaff(element: EventShiftDto, selection: number) {
    const oldAssignedStaffId = element.assignedStaffId;
    element.assignedStaffId = +selection;

    this.shiftApi
      .updateAssignments(element)
      .pipe(
        catchError(() => {
          element.assignedStaffId = oldAssignedStaffId;
          return EMPTY;
        }),
      )
      .subscribe(() => {
        this.eliminateDuplicateStaff(element.id, element.assignedStaffId);
      });
  }

  public getCategoryString(element: EventShiftDto): string {
    let returnString = element.category.name;

    if (element.category.requiresRangeOfficer) {
      returnString += ' (SM benötigt)';
    }

    return returnString;
  }

  public getMemberNameWithSkills(staff: OrganizationMemberDto): string {
    return StringHelper.getMemberNameWithSkills(staff);
  }

  private eliminateDuplicateStaff(shiftId: number, staffId: number) {
    this.shiftList.forEach((listItem) => {
      if (listItem.id != shiftId && listItem.assignedStaffId == staffId) {
        listItem.assignedStaffId = 0;
      }
    });
  }

  private fetch() {
    this.shiftApi.getAllByOrganization(this.eventId, this.organizationId).subscribe((response) => {
      this.shiftList = response;

      this.filterStaffList();
      this.sortList();
    });
  }

  private filterStaffList() {
    this.shiftList.forEach((shift) => {
      if (shift.assignedStaffId == undefined) {
        shift.assignedStaffId = 0;
      }

      if (shift.done || shift.locked) {
        this.staffList = this.staffList.filter((staff) => {
          return staff.id != shift.assignedStaffId;
        });
      }
    });
  }

  private sortList() {
    this.shiftList.sort((a, b) => {
      if (a.category.position > b.category.position) {
        return 1;
      }

      if (a.category.position < b.category.position) {
        return -1;
      }

      if (a.start > b.start) {
        return 1;
      }

      if (a.start < b.start) {
        return -1;
      }

      if (a.organizationId > b.organizationId) {
        return 1;
      }

      if (a.organizationId < b.organizationId) {
        return -1;
      }

      return 0;
    });
  }
}
