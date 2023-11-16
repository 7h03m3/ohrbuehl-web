import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { OrganizationMemberApi } from '../../../api/classes/organization-member-api';
import { EventStaffStatisticItem } from './classes/event-staff-statistic-item';
import { EventShiftDto } from '../../../shared/dtos/event-shift.dto';
import { OrganizationMemberDto } from '../../../shared/dtos/organization-member.dto';
import { AuthService } from '../../../auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserLocalData } from '../../../shared/classes/user-local-data';

@Component({
  selector: 'app-event-staff-statistic',
  templateUrl: './event-staff-statistic.component.html',
  styleUrls: ['./event-staff-statistic.component.css'],
})
export class EventStaffStatisticComponent {
  public dataSource = new MatTableDataSource<EventStaffStatisticItem>();
  public displayedColumns: string[] = ['name', 'pool-count', 'shift-count', 'present-count', 'not-present-count'];
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  private organizationId = 0;
  private memberList = new Array<OrganizationMemberDto>();
  private memberApi: OrganizationMemberApi;

  constructor(private apiService: ApiService, private authService: AuthService, private userDate: UserLocalData) {
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

  public ngOnInit(): void {
    this.organizationId = this.authService.getManagingOrganizationId();

    this.fetch();
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onYearChange() {
    this.fetch();
  }

  private fetch() {
    const year = this.userDate.getCurrentYear();
    this.memberApi.getAllDetailedByOrganization(this.organizationId, year).subscribe((response) => {
      this.memberList = response;
      const statisticList = new Array<EventStaffStatisticItem>();
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
          statisticList.push(listItem);
        }
      });

      this.dataSource.data = statisticList;
    });
  }
}
