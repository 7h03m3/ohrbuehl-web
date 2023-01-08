import { Component } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { StringHelper } from '../../../shared/classes/string-helper';
import { EventApi } from '../../../api/classes/event-api';
import { EventDto } from '../../../shared/dtos/event.dto';
import { ActivatedRoute } from '@angular/router';
import { EventShiftApi } from '../../../api/classes/event-shift-api';
import { EventShiftDto } from '../../../shared/dtos/event-shift.dto';
import { EventShiftEditListItemDto } from './dtos/event-shift-edit-list-item.dto';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { OrganizationApi } from '../../../api/classes/organization-api';
import { OrganizationMemberApi } from '../../../api/classes/organization-member-api';
import { OrganizationMemberDto } from '../../../shared/dtos/organization-member.dto';
import { EventShiftEditDialogComponent } from '../event-shift-edit-dialog/event-shift-edit-dialog.component';
import { EventShiftCreateDto } from '../../../shared/dtos/event-shift-create.dto';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-event-shift-edit',
  templateUrl: './event-shift-edit.component.html',
  styleUrls: ['./event-shift-edit.component.css'],
})
export class EventShiftEditComponent {
  public eventData = new EventDto();
  public shiftList = new Array<EventShiftEditListItemDto>();
  public organizationList = new Array<OrganizationDto>();
  public staffMap = new Map<number, OrganizationMemberDto[]>();
  public displayedColumns: string[] = ['category', 'time', 'organization', 'staff', 'action'];
  private eventId = 0;
  private eventApi: EventApi;
  private shiftApi: EventShiftApi;
  private organizationApi: OrganizationApi;
  private staffApi: OrganizationMemberApi;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public dialog: MatDialog,
    private stringHelper: StringHelper,
  ) {
    this.eventApi = this.apiService.getEvent();
    this.shiftApi = this.apiService.getEventShift();
    this.organizationApi = this.apiService.getOrganization();
    this.staffApi = this.apiService.getOrganizationMember();
  }

  public ngOnInit(): void {
    this.organizationApi.getAllNative().subscribe((data) => {
      this.organizationList = new Array<OrganizationDto>();

      const notSelected = new OrganizationDto();
      notSelected.abbreviation = '-';
      this.organizationList.push(notSelected);

      data = data.sort();
      data.forEach((entry) => {
        this.organizationList.push(entry);
      });
    });

    this.route.paramMap.subscribe((data) => {
      const idString = data.get('eventId');

      if (idString != null) {
        this.eventId = Number(idString);
        this.fetch();
      }
    });
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

  public onShiftNew() {
    const newShift = new EventShiftCreateDto();
    newShift.eventId = this.eventId;
    newShift.start = this.eventData.start;
    newShift.end = this.eventData.end;

    const dialogRef = this.dialog.open(EventShiftEditDialogComponent, {
      data: {
        create: true,
        shiftData: newShift,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data != undefined && data.result) {
        for (let i = 0; i < data.amount; i++) {
          this.shiftApi.create(data.shiftData).subscribe((data) => {
            this.fetch();
          });
        }
      }
    });
  }

  public onShiftEdit(element: EventShiftEditListItemDto) {
    const dialogRef = this.dialog.open(EventShiftEditDialogComponent, {
      data: {
        create: false,
        shiftData: element.shift,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data != undefined && data.result) {
        this.shiftApi.update(data.shiftData).subscribe((data) => {
          this.fetch();
        });
      }
    });
  }

  public onShiftSetLock(element: EventShiftEditListItemDto, locked: boolean) {
    element.shift.locked = locked;
    this.shiftApi.update(element.shift).subscribe();
  }

  public onShiftSetDone(element: EventShiftEditListItemDto, done: boolean, present: boolean) {
    element.shift.done = done;
    element.shift.present = present;
    this.shiftApi.update(element.shift).subscribe();
  }

  public onShiftDelete(element: EventShiftEditListItemDto) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        itemName: 'Schicht ' + element.shift.category.name,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.shiftApi.delete(element.shift.id).subscribe((response) => {
          this.fetch();
        });
      }
    });
  }

  public isShiftEditable(element: EventShiftEditListItemDto): boolean {
    return this.isShiftDone(element) == false && this.isShiftLocked(element) == false;
  }

  public isShiftDone(element: EventShiftEditListItemDto): boolean {
    return element.shift.done == true;
  }

  public isShiftLocked(element: EventShiftEditListItemDto): boolean {
    return element.shift.locked == true;
  }

  public isShiftPresent(element: EventShiftEditListItemDto): boolean {
    return this.isShiftDone(element) == true && element.shift.present == true;
  }

  public isShiftFilledIn(element: EventShiftEditListItemDto): boolean {
    return (
      element.shift.categoryId != null &&
      element.shift.assignedStaffId != null &&
      element.shift.categoryId != 0 &&
      element.shift.assignedStaffId != 0
    );
  }

  public getShiftTimeString(shift: EventShiftDto): string {
    const startTime = this.stringHelper.getTimeString(shift.start);
    const endTime = this.stringHelper.getTimeString(shift.end);

    return startTime + ' - ' + endTime;
  }

  public onChangeOrganization(element: EventShiftEditListItemDto, selection: number) {
    element.shift.organizationId = +selection;
    element.shift.assignedStaffId = 0;
    this.resetShiftStates(element);
    this.shiftApi.update(element.shift).subscribe((response) => {
      this.fetch();
    });
  }

  public onChangeStaff(element: EventShiftEditListItemDto, selection: number) {
    const oldAssignedStaffId = element.shift.assignedStaffId;
    element.shift.assignedStaffId = +selection;

    this.shiftApi
      .updateAssignments(element.shift)
      .pipe(
        catchError((response) => {
          element.shift.assignedStaffId = oldAssignedStaffId;
          return EMPTY;
        }),
      )
      .subscribe((response) => {
        this.eliminateDuplicateStaff(element.shift.id, element.shift.assignedStaffId);
      });
  }

  public getOrganizationColor(element: EventShiftEditListItemDto) {
    let color = 'white';
    const organizationId = element.shift.organizationId;
    if (element.shift.organizationId != 0) {
      const organization = this.organizationList.find((element) => element.id == organizationId);

      if (organization != undefined) {
        color = organization.color;
      }
    }

    return color;
  }

  private eliminateDuplicateStaff(shiftId: number, staffId: number) {
    this.shiftList.forEach((listItem) => {
      if (listItem.shift.id != shiftId && listItem.shift.assignedStaffId == staffId) {
        listItem.shift.assignedStaffId = 0;
        this.resetShiftStates(listItem);
      }
    });
  }

  private resetShiftStates(element: EventShiftEditListItemDto) {
    element.shift.locked = false;
    element.shift.done = false;
    element.shift.present = false;
  }

  private loadStaffList(element: EventShiftEditListItemDto) {
    const mapEntry = this.staffMap.get(element.shift.organizationId);

    if (mapEntry != undefined) {
      this.setStaffList(element, mapEntry);
    } else {
      this.staffApi.getAllByOrganization(element.shift.organizationId).subscribe((data) => {
        this.staffMap.set(element.shift.organizationId, data);
        this.setStaffList(element, data);
      });
    }
  }

  private setStaffList(element: EventShiftEditListItemDto, staffList: OrganizationMemberDto[]) {
    element.staffList = new Array<OrganizationMemberDto>();

    const nonSelected = new OrganizationMemberDto();
    nonSelected.firstName = '-';
    nonSelected.organizationId = 0;

    element.staffList.push(nonSelected);

    staffList.forEach((staff) => {
      element.staffList.push(staff);
    });
  }

  private fetch() {
    this.eventApi.getById(this.eventId).subscribe((data) => {
      this.eventData = data;
    });

    this.shiftApi.getAll(this.eventId).subscribe((data) => {
      this.shiftList = new Array<EventShiftEditListItemDto>();

      data.forEach((shift) => {
        const item = new EventShiftEditListItemDto();
        item.shift = shift;
        if (shift.organizationId == null) {
          item.shift.organizationId = 0;
        } else {
          this.loadStaffList(item);
        }

        if (shift.assignedStaffId == null) {
          item.shift.assignedStaffId = 0;
        }

        this.shiftList.push(item);
      });

      this.sortList();
    });
  }

  private sortList() {
    this.shiftList.sort((a, b) => {
      if (a.shift.category.position > b.shift.category.position) {
        return 1;
      }

      if (a.shift.category.position < b.shift.category.position) {
        return -1;
      }

      if (a.shift.start > b.shift.start) {
        return 1;
      }

      if (a.shift.start < b.shift.start) {
        return -1;
      }

      if (a.shift.organizationId > b.shift.organizationId) {
        return 1;
      }

      if (a.shift.organizationId < b.shift.organizationId) {
        return -1;
      }

      return 0;
    });
  }
}
