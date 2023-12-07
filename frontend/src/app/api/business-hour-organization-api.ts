import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessHourReservationDto } from '../../shared/dtos/business-hour-reservation.dto';
import { BusinessHoursDto } from '../../shared/dtos/business-hours.dto';
import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class BusinessHourOrganizationApi extends BaseApi {
  constructor(private http: HttpClient) {
    super('business-hours/organization');
  }

  public getReservationDates(): Observable<BusinessHoursDto[]> {
    return this.http.get<BusinessHoursDto[]>(this.url + '/reservation-dates/');
  }

  public getReservationsOfYear(organizationId: number, year: number): Observable<BusinessHourReservationDto[]> {
    return this.http.get<BusinessHourReservationDto[]>(this.url + '/list/' + organizationId + '/' + year);
  }

  public getNextReservations(organizationId: number): Observable<BusinessHourReservationDto[]> {
    return this.http.get<BusinessHourReservationDto[]>(this.url + '/next/' + organizationId);
  }

  public createReservation(dto: BusinessHourReservationDto): Observable<BusinessHourReservationDto> {
    return this.http.post<BusinessHourReservationDto>(this.url, dto);
  }

  public updateReservation(dto: BusinessHourReservationDto): Observable<BusinessHourReservationDto> {
    return this.http.put<BusinessHourReservationDto>(this.url, dto);
  }

  public deleteReservation(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
