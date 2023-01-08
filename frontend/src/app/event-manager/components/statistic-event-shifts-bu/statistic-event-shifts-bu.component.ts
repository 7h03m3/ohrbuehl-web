import { Component, ViewChild } from '@angular/core';
import { EventDto } from '../../../shared/dtos/event.dto';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { EventApi } from '../../../api/classes/event-api';
import { OrganizationApi } from '../../../api/classes/organization-api';
import { ApiService } from '../../../api/api.service';
import { StatisticEventShiftsTableComponent } from '../statistic-event-shifts/statistic-event-shifts-table.component';

@Component({
  selector: 'app-statistic-event-shifts-bu',
  templateUrl: './statistic-event-shifts-bu.component.html',
  styleUrls: ['./statistic-event-shifts-bu.component.css'],
})
export class StatisticEventShiftsBuComponent {
  public eventList = new Array<EventDto>();
  public organizationList = new Array<OrganizationDto>();
  private tableComponent: any;
  private eventApi: EventApi;
  private organizationApi: OrganizationApi;

  constructor(private apiService: ApiService) {
    this.eventApi = this.apiService.getEvent();
    this.organizationApi = this.apiService.getOrganization();
  }

  @ViewChild(StatisticEventShiftsTableComponent)
  set appShark(child: StatisticEventShiftsTableComponent) {
    this.tableComponent = child;
  }

  public ngOnInit(): void {
    this.eventApi.getAllWithShifts().subscribe((response) => {
      this.eventList = response;

      this.organizationApi.getAllNative().subscribe((response) => {
        this.organizationList = response;
        console.log(this.organizationList);
        this.tableComponent.fetch(this.eventList, this.organizationList);
      });
    });
  }
}
