import { Component, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { BusinessHourAdminApi } from '../../../api/classes/business-hour-admin-api';
import { BusinessHoursDto } from '../../../shared/dtos/business-hours.dto';
import { BusinessHourReservationDto } from '../../../shared/dtos/business-hour-reservation.dto';
import { StringHelper } from '../../../shared/classes/string-helper';
import { MatCalendarCellClassFunction, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { BusinessHourHelperService } from '../../classes/business-hour-helper.service';

@Component({
  selector: 'app-business-hour-admin-daily-view',
  templateUrl: './business-hour-admin-daily-view.component.html',
  styleUrls: ['./business-hour-admin-daily-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BusinessHourAdminDailyViewComponent {
  public businessHourList = new Array<BusinessHoursDto>();
  public displayedColumns = ['number', 'facilityType', 'count', 'organization', 'eventType'];
  public date: Date;
  private businessHoursApi: BusinessHourAdminApi;
  private dateList = new Array<Date>();

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserLocalData,
  ) {
    this.businessHoursApi = apiService.getBusinessHoursAdmin();
    this.date = userService.getDate();
  }

  public ngOnInit() {
    this.businessHoursApi.getAllDates().subscribe((response) => {
      response.map((current) => {
        this.dateList.push(new Date(+current));
      });
    });
    this.fetch();
  }

  public dateFilter = (dateMoment: Date | null): boolean => {
    if (!dateMoment || !this.dateList) {
      return false;
    }

    const date = new Date(dateMoment.valueOf());

    return BusinessHourHelperService.isStartInDateList(date.getTime(), this.dateList);
  };

  public dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const isInList = BusinessHourHelperService.isStartInDateList(cellDate.valueOf(), this.dateList);
      return isInList ? 'date-picker-date-class' : '';
    }

    return '';
  };

  public onDateChange(event: MatDatepickerInputEvent<any>) {
    this.date = new Date(event.value._d);
    this.userService.setDate(this.date);
    this.fetch();
  }

  public onReservationEdit(businessHour: BusinessHoursDto) {
    this.router.navigate(['edit', { id: businessHour.id }], { relativeTo: this.route });
  }

  public getDateString(): string {
    return StringHelper.getDateString(this.date.getTime());
  }

  public getTimeString(element: BusinessHoursDto): string {
    return StringHelper.getStartEndTimeString(element.start, element.end);
  }

  public getFacilityTypeString(element: BusinessHourReservationDto): string {
    return StringHelper.getReservationFacilityTypeSimpleString(element.facilityType);
  }

  public getEventTypeString(element: BusinessHourReservationDto): string {
    let eventTypeString = StringHelper.getEventTypeSimpleString(element.eventType);

    if (element.comment.length != 0) {
      eventTypeString += ' (' + element.comment + ')';
    }

    return eventTypeString;
  }

  public getCountString(element: BusinessHourReservationDto): string {
    return StringHelper.getReservationCountString(element);
  }

  private fetch() {
    this.businessHoursApi.getAllOfDay(this.date.getTime()).subscribe((response) => {
      this.businessHourList = response.sort((a, b) => {
        if (a.start > b.start) {
          return 1;
        } else if (a.start < b.start) {
          return -1;
        }
        return 0;
      });
    });
  }
}
