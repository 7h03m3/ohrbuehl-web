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
  private eventApi: EventApi;
  private memberApi: OrganizationMemberApi;
  private organizationApi: OrganizationApi;

  constructor(private apiService: ApiService, private userData: UserLocalData, private stringHelper: StringHelper) {
    this.organizationApi = this.apiService.getOrganization();
    this.eventApi = apiService.getEvent();
    this.memberApi = apiService.getOrganizationMember();
  }

  public ngOnInit(): void {
    this.organizationApi.getByManagerId(this.userData.getUserId()).subscribe((response) => {
      this.organizationId = response.id;

      this.eventApi.getAll().subscribe((response) => {
        this.eventList = response;
        console.log(this.eventList);

        this.memberApi.getAllByOrganization(this.organizationId).subscribe((response) => {
          this.memberList = response;
          console.log(this.memberList);
          this.fetch();
        });
      });
    });
  }

  private fetch() {
    this.dataSource = this.memberList;

    this.eventList.forEach((event) => {
      const colum = new EventStaffPoolEditTableColumn();
      colum.eventId = event.id;
      colum.def = 'event' + event.id;
      colum.header = this.getTimeString(event);
      this.columns.push(colum);
      this.displayedColumns.push(colum.def);
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
