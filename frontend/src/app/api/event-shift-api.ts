import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventShiftDto } from '../../shared/dtos/event-shift.dto';
import { EventShiftCreateDto } from '../../shared/dtos/event-shift-create.dto';
import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class EventShiftApi extends BaseApi {
  constructor(private http: HttpClient) {
    super('events/shift');
  }

  public getAll(eventId: number): Observable<EventShiftDto[]> {
    return this.http.get<EventShiftDto[]>(this.url + '/' + eventId);
  }

  public getAllByOrganization(eventId: number, organizationId: number): Observable<EventShiftDto[]> {
    return this.http.get<EventShiftDto[]>(this.url + '/' + eventId + '/' + organizationId);
  }

  public getById(id: number): Observable<EventShiftDto> {
    return this.http.get<EventShiftDto>(this.url + '/' + id);
  }

  public create(createDto: EventShiftCreateDto): Observable<EventShiftDto> {
    return this.http.post<EventShiftDto>(this.url, createDto);
  }

  public update(updateDto: EventShiftDto): Observable<EventShiftDto> {
    return this.http.put<EventShiftDto>(this.url, updateDto);
  }

  public updateAssignments(updateDto: EventShiftDto): Observable<EventShiftDto> {
    return this.http.put<EventShiftDto>(this.url + '/assignments', updateDto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
