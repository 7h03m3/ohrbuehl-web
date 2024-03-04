import { Component, OnInit } from '@angular/core';
import { OrganizationMemberApi } from '../../../api/organization-member-api';
import { EventStaffPoolApi } from '../../../api/event-staff-pool-api';
import { AuthService } from '../../../auth/auth.service';
import { OrganizationMemberDto } from '../../../shared/dtos/organization-member.dto';
import { EventApi } from '../../../api/event-api';
import { EventDto } from '../../../shared/dtos/event.dto';
import { StringHelper } from '../../../shared/classes/string-helper';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { EventStaffPoolDto } from '../../../shared/dtos/event-staff-pool.dto';

@Component({
  selector: 'app-event-staff-availability-edit',
  templateUrl: './event-staff-availability-edit.component.html',
  styleUrls: ['./event-staff-availability-edit.component.css'],
})
export class EventStaffAvailabilityEditComponent implements OnInit {
  public memberList = new Array<OrganizationMemberDto>();
  public eventList = new Array<EventDto>();
  public organizationId = 0;
  public selectedMember = 0;
  public memberInfo = new OrganizationMemberDto();
  protected readonly StringHelper = StringHelper;

  constructor(
    private memberApi: OrganizationMemberApi,
    private staffPoolApi: EventStaffPoolApi,
    private eventApi: EventApi,
    private authService: AuthService,
  ) {}

  public ngOnInit() {
    this.organizationId = this.authService.getManagingOrganizationId();

    this.memberApi.getAllByOrganization(this.organizationId).subscribe((response) => {
      this.memberList = response;
    });
  }

  public onMemberSelect(memberId: number) {
    const date = new Date();
    const year = date.getFullYear();
    this.memberInfo = new OrganizationMemberDto();

    this.eventApi.getAllWithShiftsByOrganizationId(this.organizationId, year).subscribe((response) => {
      this.eventList = response;

      this.eventList = this.eventList.sort((a, b) => {
        return a.start > b.start ? 1 : a.start < b.start ? -1 : 0;
      });

      this.eventList = this.eventList.sort((a, b) => {
        return a.category.name > b.category.name ? 1 : a.category.name < b.category.name ? -1 : 0;
      });
      this.memberApi.getShiftsByIdAndYear(memberId, year).subscribe((response) => {
        this.memberInfo = response;
      });
    });
  }

  public isNewSection(index: number): boolean {
    return index == 0 ? true : this.eventList[index].categoryId != this.eventList[index - 1].categoryId;
  }

  public isAvailable(event: EventDto): boolean {
    if (this.hasShift(event)) {
      return true;
    }

    const found = this.memberInfo.staffPool.find((a) => {
      return a.eventId == event.id;
    });
    return found != undefined;
  }

  public hasShift(event: EventDto): boolean {
    const found = this.memberInfo.eventShifts.find((a) => {
      return a.eventId == event.id;
    });
    return found != undefined;
  }

  public getAddText(event: EventDto): string {
    return this.hasShift(event) ? '(eingeteilt)' : '';
  }

  public onCheckboxChange(event: EventDto, newValue: MatCheckboxChange) {
    const dto = new EventStaffPoolDto();
    dto.eventId = event.id;
    dto.memberId = this.memberInfo.id;
    dto.organizationId = this.organizationId;

    if (newValue.checked) {
      this.staffPoolApi.addStaff(dto).subscribe();
    } else {
      this.staffPoolApi.removeStaff(dto).subscribe();
    }
  }
}
