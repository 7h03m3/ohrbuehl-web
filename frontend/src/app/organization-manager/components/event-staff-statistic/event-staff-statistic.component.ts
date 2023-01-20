import { Component } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { OrganizationMemberApi } from '../../../api/classes/organization-member-api';
import { EventStaffStatisticItem } from './classes/event-staff-statistic-item';
import { EventShiftDto } from '../../../shared/dtos/event-shift.dto';
import { OrganizationMemberDto } from '../../../shared/dtos/organization-member.dto';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-event-staff-statistic',
  templateUrl: './event-staff-statistic.component.html',
  styleUrls: ['./event-staff-statistic.component.css'],
})
export class EventStaffStatisticComponent {
  public dataSource = new Array<EventStaffStatisticItem>();
  public displayedColumns: string[] = ['name', 'pool-count', 'shift-count', 'present-count', 'not-present-count'];
  private organizationId = 0;
  private memberList = new Array<OrganizationMemberDto>();
  private memberApi: OrganizationMemberApi;

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.memberApi = apiService.getOrganizationMember();
  }

  private static getPresentCount(shiftList: EventShiftDto[]): number {
    return shiftList.filter((value) => {
      return value.done && value.present;
    }).length;
  }

  private static getNotePresentCount(shiftList: EventShiftDto[]): number {
    return shiftList.filter((value) => {
      return value.done && !value.present;
    }).length;
  }

  public async ngOnInit(): Promise<void> {
    this.organizationId = await this.authService.getManagingOrganizationId();
    this.memberApi.getAllDetailedByOrganization(this.organizationId).subscribe((response) => {
      this.memberList = response;
      this.fetch();
    });
  }

  private fetch() {
    this.dataSource = new Array<EventStaffStatisticItem>();
    this.memberList.forEach((member) => {
      const staffPoolCount = member.staffPool.length;
      const shiftCount = member.eventShifts.length;

      if (staffPoolCount != 0 || shiftCount != 0) {
        const listItem = new EventStaffStatisticItem();
        listItem.name = member.firstName + ' ' + member.lastName;
        listItem.poolCount = member.staffPool.length;
        listItem.shiftCount = member.eventShifts.length;
        listItem.presentCount = EventStaffStatisticComponent.getPresentCount(member.eventShifts);
        listItem.notPresentCount = EventStaffStatisticComponent.getNotePresentCount(member.eventShifts);
        this.dataSource.push(listItem);
      }
    });
  }
}
