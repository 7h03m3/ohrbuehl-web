import { Component } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { BusinessHourAdminApi } from '../../../api/classes/business-hour-admin-api';
import { BusinessHoursDto } from '../../../shared/dtos/business-hours.dto';
import { BusinessHourReservationDto } from '../../../shared/dtos/business-hour-reservation.dto';
import { StringHelper } from '../../../shared/classes/string-helper';
import { ReservationFacilityType } from '../../../shared/enums/reservation-facility-type.enum';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { Moment } from 'moment';

@Component({
  selector: 'app-business-hour-admin-daily-view',
  templateUrl: './business-hour-admin-daily-view.component.html',
  styleUrls: ['./business-hour-admin-daily-view.component.css'],
})
export class BusinessHourAdminDailyViewComponent {
  public businessHourList = new Array<BusinessHoursDto>();
  public displayedColumns = ['number', 'facilityType', 'count', 'organization', 'eventType'];
  public date: Date;
  private businessHoursApi: BusinessHourAdminApi;
  private dateList = new Array<Date>();

  constructor(private apiService: ApiService, private router: Router, private userService: UserLocalData) {
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

  public dateFilter = (dateMoment: Moment | null): boolean => {
    if (!dateMoment || !this.dateList) {
      return false;
    }

    const date = new Date(dateMoment.valueOf());

    for (const current of this.dateList) {
      if (
        current.getFullYear() == date.getFullYear() &&
        current.getMonth() == date.getMonth() &&
        current.getDate() == date.getDate()
      ) {
        return true;
      }
    }

    return false;
  };

  public onDateChange(event: MatDatepickerInputEvent<any>) {
    this.date = new Date(event.value._d);
    this.userService.setDate(this.date);
    this.fetch();
  }

  public onReservationEdit(businessHour: BusinessHoursDto) {
    this.router.navigate(['/shooting-range/reservation-edit', { id: businessHour.id }]);
  }

  public getOrganizationString(element: BusinessHourReservationDto): string {
    if (element.organization) {
      return element.organization.abbreviation;
    }

    return 'Einzelschütze (' + element.owner.firstName + ' ' + element.owner.lastName + ')';
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
    switch (element.facilityType) {
      case ReservationFacilityType.Distance50mManuel:
      case ReservationFacilityType.Distance25mBlockManuel:
        return element.count + ' (manuell)';
      case ReservationFacilityType.Distance50mElectronic:
      case ReservationFacilityType.Distance25mBlockElectronic:
        return element.count + ' (elektronisch)';
      default:
        return element.count.toString();
    }

    return StringHelper.getReservationFacilityTypeSimpleString(element.facilityType);
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
