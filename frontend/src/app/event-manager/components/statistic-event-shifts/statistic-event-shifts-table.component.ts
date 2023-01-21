import { Component } from '@angular/core';
import { StatisticEventShiftTableColumn } from './classes/statistic-event-shift-table-column';
import { EventDto } from '../../../shared/dtos/event.dto';
import { ApiService } from '../../../api/api.service';
import { EventApi } from '../../../api/classes/event-api';
import { OrganizationApi } from '../../../api/classes/organization-api';
import { StatisticEventShiftTableData } from './classes/statistic-event-shift-table-data';
import { OrganizationDto } from '../../../shared/dtos/organization.dto';
import { StringHelper } from '../../../shared/classes/string-helper';

@Component({
  selector: 'app-statistic-event-shifts-table',
  templateUrl: './statistic-event-shifts-table.component.html',
  styleUrls: ['./statistic-event-shifts-table.component.css'],
})
export class StatisticEventShiftsTableComponent {
  public displayedColumns = ['date'];
  public columns = new Array<StatisticEventShiftTableColumn>();
  public dataSource = new Array<StatisticEventShiftTableData>();
  private eventList = new Array<EventDto>();
  private organizationList = new Array<OrganizationDto>();
  private eventApi: EventApi;
  private organizationApi: OrganizationApi;

  constructor(private apiService: ApiService, private stringHelper: StringHelper) {
    this.eventApi = this.apiService.getEvent();
    this.organizationApi = this.apiService.getOrganization();
  }

  public ngOnInit(): void {}

  public fetch(events: EventDto[], organizations: OrganizationDto[]) {
    this.eventList = events;
    this.organizationList = organizations;
    this.displayedColumns = ['date'];
    this.fetchEventData();
    this.fetchOrganizationData();
    this.fetchTotalShiftCount();

    const dataEntry = new StatisticEventShiftTableData();
    dataEntry.event = new EventDto();
    this.dataSource.push(dataEntry);

    this.displayedColumns.push('total');
  }

  public getTimeString(element: StatisticEventShiftTableData): string {
    if (this.isTotalRow(element)) {
      return '';
    }
    return this.stringHelper.getStartEndDateTimeString(element.event.start, element.event.end);
  }

  public getTotalString(element: StatisticEventShiftTableData): string {
    if (this.isTotalRow(element)) {
      return '';
    }
    return element.totalShifts.toString();
  }

  public isTotalRow(element: StatisticEventShiftTableData): boolean {
    return element.event.id == 0;
  }

  private fetchEventData() {
    this.dataSource = new Array<StatisticEventShiftTableData>();
    this.eventList.forEach((event) => {
      const dataEntry = new StatisticEventShiftTableData();
      dataEntry.event = event;
      this.dataSource.push(dataEntry);
    });
  }

  private fetchOrganizationData() {
    this.columns = new Array<StatisticEventShiftTableColumn>();
    this.organizationList.forEach((organization) => {
      const column = this.addOrganisationColumn(organization.abbreviation, organization.id);

      this.dataSource.forEach((data) => {
        const shiftCount = this.getShiftCount(data.event, column.organizationId);
        column.total = column.total + shiftCount;
        column.dataMap.set(data.event.id, shiftCount);
        column.dataMap.set(0, column.total);
      });
    });
  }

  private fetchTotalShiftCount() {
    this.dataSource.forEach((data) => {
      this.columns.forEach((column) => {
        const columnData = column.dataMap.get(data.event.id);
        if (columnData != undefined) {
          data.totalShifts = data.totalShifts + columnData;
        }
      });
    });
  }

  private getShiftCount(event: EventDto, organizationId: number) {
    const shiftList = event.shifts.filter((shift) => {
      return shift.organizationId != null && shift.organizationId == organizationId;
    });

    return shiftList.length;
  }

  private addOrganisationColumn(header: string, organizationId: number): StatisticEventShiftTableColumn {
    return this.addColumn('org' + organizationId, header, organizationId);
  }

  private addColumn(def: string, header: string, organizationId: number): StatisticEventShiftTableColumn {
    const column = new StatisticEventShiftTableColumn();
    column.def = def;
    column.header = header;
    column.organizationId = organizationId;
    this.columns.push(column);
    this.displayedColumns.push(column.def);

    return column;
  }
}
