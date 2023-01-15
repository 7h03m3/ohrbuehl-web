import { Component } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { OrganizationMemberApi } from '../../../api/classes/organization-member-api';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { OrganizationApi } from '../../../api/classes/organization-api';
import { EventStaffStatisticItem } from './classes/event-staff-statistic-item';
import { EventShiftDto } from '../../../shared/dtos/event-shift.dto';
import { OrganizationMemberDto } from '../../../shared/dtos/organization-member.dto';

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
  private organizationApi: OrganizationApi;

  constructor(private apiService: ApiService, private userData: UserLocalData) {
    this.organizationApi = this.apiService.getOrganization();
    this.memberApi = apiService.getOrganizationMember();
  }

  public ngOnInit(): void {
    this.organizationApi.getByManagerId(this.userData.getUserId()).subscribe((response) => {
      this.organizationId = response.id;
      this.memberApi.getAllDetailedByOrganization(this.organizationId).subscribe((response) => {
        this.memberList = response;
        this.fetch();
      });
    });
  }

  private fetch() {
    this.dataSource = new Array<EventStaffStatisticItem>();
    this.memberList.forEach((member) => {
      const staffPoolCount = member.staffPool.length;
      if (staffPoolCount != 0) {
        const listItem = new EventStaffStatisticItem();
        listItem.name = member.firstName + ' ' + member.lastName;
        listItem.poolCount = member.staffPool.length;
        listItem.shiftCount = member.eventShifts.length;
        listItem.presentCount = this.getPresentCount(member.eventShifts);
        listItem.notPresentCount = this.getNotePresentCount(member.eventShifts);
        this.dataSource.push(listItem);
      }
    });
  }

  private getPresentCount(shiftList: EventShiftDto[]): number {
    return shiftList.filter((value) => {
      return value.done && value.present;
    }).length;
  }

  private getNotePresentCount(shiftList: EventShiftDto[]): number {
    return shiftList.filter((value) => {
      return value.done && !value.present;
    }).length;
  }
}
