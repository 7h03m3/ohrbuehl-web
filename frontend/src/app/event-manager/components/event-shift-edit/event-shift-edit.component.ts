import { Component } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { StringHelper } from '../../../shared/classes/string-helper';
import { EventApi } from '../../../api/classes/event-api';
import { EventDto } from '../../../shared/dtos/event.dto';
import { ActivatedRoute } from '@angular/router';
import { EventShiftCategoryApi } from '../../../api/classes/event-shift-category-api';
import { EventShiftCategoryDto } from '../../../shared/dtos/event-shift-category.dto';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EventShiftCreateDto } from '../../../shared/dtos/event-shift-create.dto';
import { EventShiftApi } from '../../../api/classes/event-shift-api';
import { EventShiftDto } from '../../../shared/dtos/event-shift.dto';
import { EventShiftListItemDto } from '../../../shared/dtos/event-shift-list-item.dto';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { OrganizationApi } from '../../../api/classes/organization-api';
import { OrganizationMemberApi } from '../../../api/classes/organization-member-api';
import { OrganizationMemberDto } from '../../../shared/dtos/organization-member.dto';

@Component({
  selector: 'app-event-shift-edit',
  templateUrl: './event-shift-edit.component.html',
  styleUrls: ['./event-shift-edit.component.css'],
})
export class EventShiftEditComponent {
  public eventData = new EventDto();
  public shiftList = new Array<EventShiftListItemDto>();
  public categoryList = new Array<EventShiftCategoryDto>();
  public organizationList = new Array<OrganizationDto>();
  public newShiftForm: UntypedFormGroup = new UntypedFormGroup({});
  public displayedColumns: string[] = ['category', 'time', 'organization', 'staff', 'action'];
  private eventId = 0;
  private eventApi: EventApi;
  private shiftApi: EventShiftApi;
  private categoryApi: EventShiftCategoryApi;
  private organizationApi: OrganizationApi;
  private staffApi: OrganizationMemberApi;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public dialog: MatDialog,
    private stringHelper: StringHelper,
    private formBuilder: UntypedFormBuilder,
  ) {
    this.eventApi = this.apiService.getEvent();
    this.shiftApi = this.apiService.getEventShift();
    this.categoryApi = this.apiService.getEventShiftCategory();
    this.organizationApi = this.apiService.getOrganization();
    this.staffApi = this.apiService.getOrganizationMember();
  }

  public ngOnInit(): void {
    this.newShiftForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      categoryId: [''],
    });

    this.categoryApi.getAll().subscribe((data) => {
      this.categoryList = data;
    });

    this.organizationApi.getAll().subscribe((data) => {
      this.organizationList = data;
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

  public onNewShift() {
    const date = this.newShiftForm.controls['date'].value;
    const startTime = this.newShiftForm.controls['startTime'].value;
    const endTime = this.newShiftForm.controls['endTime'].value;
    const categoryId = this.newShiftForm.controls['categoryId'].value;

    const newShift = new EventShiftCreateDto();
    newShift.start = this.stringHelper.getDate(date, startTime);
    newShift.end = this.stringHelper.getDate(date, endTime);
    newShift.categoryId = categoryId;
    newShift.eventId = this.eventId;

    this.shiftApi.create(newShift).subscribe((data) => {
      this.fetch();
    });
  }

  public getShiftTimeString(shift: EventShiftDto): string {
    const startTime = this.stringHelper.getTimeString(shift.start);
    const endTime = this.stringHelper.getTimeString(shift.end);

    return startTime + ' - ' + endTime;
  }

  public onOrganizationChange(element: EventShiftListItemDto, selection: number) {
    element.shift.organizationId = +selection;
    element.shift.assignedStaffId = 0;
    this.shiftApi.update(element.shift).subscribe();
    this.loadStaffList(element, element.shift.organizationId);
  }

  public onStaffChange(element: EventShiftListItemDto, selection: number) {
    element.shift.assignedStaffId = +selection;
    this.shiftApi.update(element.shift).subscribe();
  }

  private loadStaffList(element: EventShiftListItemDto, organizationId: number) {
    this.staffApi.getAllByOrganization(element.shift.organizationId).subscribe((data) => {
      element.staffList = new Array<OrganizationMemberDto>();

      const nonSelected = new OrganizationMemberDto();
      nonSelected.firstName = '-';

      element.staffList.push(nonSelected);

      data.forEach((staff) => {
        element.staffList.push(staff);
      });
    });
  }

  private fetch() {
    this.eventApi.getById(this.eventId).subscribe((data) => {
      this.eventData = data;

      const date = new Date(+this.eventData.start);
      date.setUTCHours(0, 0, 0, 0);
      this.newShiftForm.controls['date'].setValue(date.toISOString());
      this.newShiftForm.controls['startTime'].setValue(this.stringHelper.getTimeString(this.eventData.start));
      this.newShiftForm.controls['endTime'].setValue(this.stringHelper.getTimeString(this.eventData.end));
    });

    this.shiftApi.getAll(this.eventId).subscribe((data) => {
      this.shiftList = new Array<EventShiftListItemDto>();

      data.forEach((shift) => {
        const item = new EventShiftListItemDto();
        item.shift = shift;
        if (shift.organizationId == null) {
          item.shift.organizationId = 0;
        } else {
          this.loadStaffList(item, shift.organizationId);
        }
        this.shiftList.push(item);
      });

      this.shiftList = this.shiftList.sort((a, b) => {
        if (a.shift.category.position > b.shift.category.position) {
          return 1;
        }

        if (a.shift.category.position < b.shift.category.position) {
          return -1;
        }

        return 0;
      });
    });
  }
}
