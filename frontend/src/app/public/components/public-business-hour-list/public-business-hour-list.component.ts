import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { BusinessHourApi } from '../../../api/classes/business-hour-api';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessHoursDto } from '../../../shared/dtos/business-hours.dto';
import { StringHelper } from '../../../shared/classes/string-helper';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PublicBusinessHourListOccupancyInfoComponent } from './components/public-business-hour-list-occupancy-info/public-business-hour-list-occupancy-info.component';

export interface TableData {
  start: number;
  end: number;
  day: string;
  comment: string;
  businessHour: BusinessHoursDto;
}

@Component({
  selector: 'app-public-business-hour-list',
  templateUrl: './public-business-hour-list.component.html',
  styleUrls: ['./public-business-hour-list.component.css'],
})
export class PublicBusinessHourListComponent {
  public dataSource = new MatTableDataSource<TableData>();
  public displayedColumns: string[] = ['date', 'day', 'comment', 'action'];
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  private businessHourApi: BusinessHourApi;

  constructor(private apiService: ApiService, private bottomSheet: MatBottomSheet) {
    this.businessHourApi = apiService.getBusinessHours();
  }

  public ngOnInit() {
    this.businessHourApi.getAll().subscribe((response) => {
      this.dataSource.data = response.map((current) => {
        return {
          start: current.start,
          end: current.end,
          day: StringHelper.getDayOfWeekLong(current.start),
          comment: current.comment,
          businessHour: current,
        };
      });
    });
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getDateString(element: BusinessHoursDto): string {
    return StringHelper.getStartEndDateTimeString(element.start, element.end);
  }

  public async onView(element: TableData) {
    this.bottomSheet.open(PublicBusinessHourListOccupancyInfoComponent, { data: element.businessHour });
  }
}