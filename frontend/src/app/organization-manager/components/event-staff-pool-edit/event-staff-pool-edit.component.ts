import { Component } from '@angular/core';
import { EventStaffPoolEditTableColumn } from './classes/event-staff-pool-edit-table-column';
import { OrganizationMemberDto } from '../../../shared/dtos/organization-member.dto';
import { ApiService } from '../../../api/api.service';
import { StringHelper } from '../../../shared/classes/string-helper';
import { EventApi } from '../../../api/classes/event-api';
import { OrganizationMemberApi } from '../../../api/classes/organization-member-api';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { OrganizationApi } from '../../../api/classes/organization-api';
import { EventDto } from '../../../shared/dtos/event.dto';
import { EventStaffPoolApi } from '../../../api/classes/event-staff-pool-api';
import { EventStaffPoolDto } from '../../../shared/dtos/event-staff-pool.dto';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-event-staff-pool-edit',
  templateUrl: './event-staff-pool-edit.component.html',
  styleUrls: ['./event-staff-pool-edit.component.css'],
})
export class EventStaffPoolEditComponent {
  public displayedColumns = ['member'];
  public columns = new Array<EventStaffPoolEditTableColumn>();
  public dataSource = new Array<OrganizationMemberDto>();
  private organizationId = 0;
  private eventList = new Array<EventDto>();
  private memberList = new Array<OrganizationMemberDto>();
  private staffPool = new Array<EventStaffPoolDto>();
  private eventApi: EventApi;
  private memberApi: OrganizationMemberApi;
  private staffPoolApi: EventStaffPoolApi;
  private organizationApi: OrganizationApi;

  constructor(private apiService: ApiService, private userData: UserLocalData, private stringHelper: StringHelper) {
    this.organizationApi = this.apiService.getOrganization();
    this.eventApi = apiService.getEvent();
    this.memberApi = apiService.getOrganizationMember();
    this.staffPoolApi = apiService.getStaffPool();
  }

  public ngOnInit(): void {
    this.organizationApi.getByManagerId(this.userData.getUserId()).subscribe((response) => {
      this.organizationId = response.id;

      this.eventApi.getAll().subscribe((response) => {
        this.eventList = response;

        this.eventList.sort(function (a, b) {
          if (a.start < b.start) {
            return -1;
          }

          return 1;
        });

        this.memberApi.getAllByOrganization(this.organizationId).subscribe((response) => {
          this.memberList = response;
          this.fetch();
        });
      });

      this.staffPoolApi.getAllByOrganization(this.organizationId).subscribe((response) => {
        this.staffPool = response;
      });
    });
  }

  public onCheckboxChange(
    member: OrganizationMemberDto,
    column: EventStaffPoolEditTableColumn,
    event: MatCheckboxChange,
  ) {
    const dto = new EventStaffPoolDto();
    dto.eventId = column.eventId;
    dto.memberId = member.id;
    dto.organizationId = this.organizationId;

    if (event.checked) {
      this.incrementColumnCount(column);
      this.staffPoolApi.addStaff(dto).subscribe();
    } else {
      this.decrementColumnCount(column);
      this.staffPoolApi.removeStaff(dto).subscribe();
    }
  }

  public isInPool(member: OrganizationMemberDto, column: EventStaffPoolEditTableColumn): boolean {
    const poolCount = this.staffPool.filter((value) => {
      return value.eventId == column.eventId && value.memberId == member.id;
    }).length;

    return poolCount != 0;
  }

  private incrementColumnCount(column: EventStaffPoolEditTableColumn) {
    column.totalCount = column.totalCount + 1;
  }

  private decrementColumnCount(column: EventStaffPoolEditTableColumn) {
    if (column.totalCount > 0) {
      column.totalCount = column.totalCount - 1;
    }
  }

  private fetch() {
    this.dataSource = this.memberList;

    this.eventList.forEach((event) => {
      const column = new EventStaffPoolEditTableColumn();
      column.eventId = event.id;
      column.def = 'event' + event.id;
      column.header = this.getTimeString(event);

      this.columns.push(column);
      this.displayedColumns.push(column.def);
    });

    this.columns.forEach((column) => {
      column.totalCount = 0;
      this.staffPool.forEach((entry) => {
        if (entry.eventId == column.eventId) {
          this.incrementColumnCount(column);
        }
      });
    });
  }

  private getTimeString(event: EventDto): string {
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
}
