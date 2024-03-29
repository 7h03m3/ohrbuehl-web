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
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MemberInfoBottomSheetComponent } from './components/member-info-bottom-sheet/member-info-bottom-sheet.component';
import { MatTableDataSource } from '@angular/material/table';
import { SortHelper } from '../../../shared/classes/sort-helper';

@Component({
  selector: 'app-event-shift-edit',
  templateUrl: './event-shift-edit.component.html',
  styleUrls: ['./event-shift-edit.component.css'],
})
export class EventShiftEditComponent {
  public eventData = new EventDto();
  public dataSource = new MatTableDataSource<EventShiftEditListItemDto>();
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
    private bottomSheet: MatBottomSheet,
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
    return StringHelper.getStartEndDateTimeString(event.start, event.end);
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

  public onInfo(element: EventShiftEditListItemDto) {
    if (element.shift.assignedStaff != undefined) {
      this.openMemberBottomSheet(element.shift.assignedStaff);
    } else {
      const memberList = element.staffList.filter((value) => {
        return value.id == element.shift.assignedStaffId;
      });

      if (memberList.length != 0) {
        this.openMemberBottomSheet(memberList[0]);
      }
    }
  }

  public getShiftCategory(element: EventShiftEditListItemDto) {
    return element.shift.category.name + ' ' + element.number;
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
    return StringHelper.getStartEndTimeString(shift.start, shift.end);
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

  public getMemberNameWithSkills(member: OrganizationMemberDto): string {
    return StringHelper.getMemberNameWithSkills(member);
  }

  private openMemberBottomSheet(member: OrganizationMemberDto) {
    this.bottomSheet.open(MemberInfoBottomSheetComponent, {
      data: {
        member: member,
      },
    });
  }

  private eliminateDuplicateStaff(shiftId: number, staffId: number) {
    this.dataSource.data.forEach((listItem) => {
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
      const shiftList = new Array<EventShiftEditListItemDto>();

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

        shiftList.push(item);
      });

      SortHelper.sortShiftList(shiftList);
      this.renumberShiftList(shiftList);
      this.dataSource.data = shiftList;
    });
  }

  private renumberShiftList(shiftList: EventShiftEditListItemDto[]) {
    let currentCategory = 0;
    let currentCount = 1;
    shiftList.forEach((entry) => {
      if (entry.shift.categoryId != currentCategory) {
        currentCategory = entry.shift.categoryId;
        currentCount = 1;
      } else {
        currentCount = currentCount + 1;
      }

      entry.number = currentCount;
    });
  }
}
