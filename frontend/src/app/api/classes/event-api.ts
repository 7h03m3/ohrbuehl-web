import { BaseApi } from './base-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventDto } from '../../shared/dtos/event.dto';
import { EventCreateDto } from '../../shared/dtos/event-create.dto';

export class EventApi extends BaseApi {
  constructor(baseUrl: string, private http: HttpClient) {
    super(baseUrl + 'events');
  }

  public getAllPublic(startDate: number): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(this.url + '/public/' + startDate);
  }

  public getAllPublicByCategory(startDate: number, categoryId: number): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(this.url + '/public/' + startDate + '/' + categoryId);
  }

  public getAll(): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(this.url);
  }

  public getAllWithShifts(): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(this.url + '/withShifts/');
  }

  public getAllWithShiftsByCategoryId(categoryId: number): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(this.url + '/withShiftsByCategoryId/' + categoryId);
  }

  public getAllWithShiftsByOrganizationId(organizationId: number): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(this.url + '/withShiftsByOrganization/' + organizationId);
  }

  public getById(id: number): Observable<EventDto> {
    return this.http.get<EventDto>(this.url + '/byId/' + id);
  }

  public create(createDto: EventCreateDto): Observable<EventDto> {
    return this.http.post<EventDto>(this.url, createDto);
  }

  public update(updateDto: EventDto): Observable<EventDto> {
    return this.http.put<EventDto>(this.url, updateDto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  public getEventReport(id: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(this.url + '/report/' + id, {
      observe: 'response',
      headers: headers,
      responseType: 'blob',
    });
  }

  public getOrganizationEventReport(organizationId: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(this.url + '/report/organization/' + organizationId, {
      observe: 'response',
      headers: headers,
      responseType: 'blob',
    });
  }

  public getOrganizationEventReportByCategory(organizationId: number, categoryId: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(this.url + '/report/organization/' + organizationId + '/' + categoryId, {
      observe: 'response',
      headers: headers,
      responseType: 'blob',
    });
  }

  public getOrganizationShiftReport(organizationId: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(this.url + '/report/organization-staff/' + organizationId, {
      observe: 'response',
      headers: headers,
      responseType: 'blob',
    });
  }
}
