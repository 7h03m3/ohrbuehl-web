import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventStaffPoolDto } from '../shared/dtos/event-staff-pool.dto';
import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class EventStaffPoolApi extends BaseApi {
  constructor(private http: HttpClient) {
    super('events/staff-pool');
  }

  public getAllByOrganizationAndEvent(organizationId: number, eventId: number): Observable<EventStaffPoolDto[]> {
    return this.http.get<EventStaffPoolDto[]>(this.url + '/' + organizationId + '/' + eventId);
  }

  public addStaff(dto: EventStaffPoolDto): Observable<EventStaffPoolDto> {
    return this.http.post<EventStaffPoolDto>(this.url, dto);
  }

  public removeStaff(dto: EventStaffPoolDto): Observable<any> {
    return this.http.delete(this.url + '/' + dto.organizationId + '/' + dto.eventId + '/' + dto.memberId);
  }
}
