import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessHoursDto } from '../shared/dtos/business-hours.dto';
import { BusinessHoursCreateDto } from '../shared/dtos/business-hours-create.dto';
import { BusinessHourReservationDto } from '../shared/dtos/business-hour-reservation.dto';
import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class BusinessHourAdminApi extends BaseApi {
  constructor(private http: HttpClient) {
    super('business-hours/admin');
  }

  public getAll(year: number): Observable<BusinessHoursDto[]> {
    return this.http.get<BusinessHoursDto[]>(this.url + '/list/' + year);
  }

  public getAllDates(): Observable<number[]> {
    const date = new Date(Date.now());
    return this.http.get<number[]>(this.url + '/list/dates/' + date.getFullYear());
  }

  public getAllOfDay(time: number): Observable<BusinessHoursDto[]> {
    return this.http.get<BusinessHoursDto[]>(this.url + '/list/day/' + time);
  }

  public getById(id: number): Observable<BusinessHoursDto> {
    return this.http.get<BusinessHoursDto>(this.url + '/' + id);
  }

  public create(createDto: BusinessHoursCreateDto): Observable<BusinessHoursDto> {
    return this.http.post<BusinessHoursDto>(this.url, createDto);
  }

  public update(updateDto: BusinessHoursDto): Observable<BusinessHoursDto> {
    return this.http.put<BusinessHoursDto>(this.url, updateDto);
  }

  public updateMaxOccupancy(updateDto: BusinessHoursDto): Observable<BusinessHoursDto> {
    return this.http.put<BusinessHoursDto>(this.url + '/maxOccupancy/', updateDto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  public createReservation(dto: BusinessHourReservationDto): Observable<BusinessHourReservationDto> {
    return this.http.post<BusinessHourReservationDto>(this.url + '/reservation', dto);
  }

  public updateReservation(dto: BusinessHourReservationDto): Observable<BusinessHourReservationDto> {
    return this.http.put<BusinessHourReservationDto>(this.url + '/reservation', dto);
  }

  public deleteReservation(id: number): Observable<any> {
    return this.http.delete(this.url + '/reservation/' + id);
  }

  public lockReservation(dto: BusinessHourReservationDto): Observable<BusinessHourReservationDto> {
    return this.http.put<BusinessHourReservationDto>(this.url + '/reservation/lock/', dto);
  }
}
