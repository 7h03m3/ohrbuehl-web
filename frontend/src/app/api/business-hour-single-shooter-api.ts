import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessHoursDto } from '../../shared/dtos/business-hours.dto';
import { BusinessHourReservationDto } from '../../shared/dtos/business-hour-reservation.dto';
import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class BusinessHourSingleShooterApi extends BaseApi {
  constructor(private http: HttpClient) {
    super('business-hours/single');
  }

  public getEventLimit(): Observable<number> {
    return this.http.get<number>(this.url + '/event-limit/');
  }

  public getReservationDates(): Observable<BusinessHoursDto[]> {
    return this.http.get<BusinessHoursDto[]>(this.url + '/reservation-dates/');
  }

  public getReservationsOfYear(userId: number, year: number): Observable<BusinessHourReservationDto[]> {
    return this.http.get<BusinessHourReservationDto[]>(this.url + '/list/' + userId + '/' + year);
  }

  public getNextReservations(userId: number): Observable<BusinessHourReservationDto[]> {
    return this.http.get<BusinessHourReservationDto[]>(this.url + '/next/' + userId);
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
