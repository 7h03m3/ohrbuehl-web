import { BaseApi } from './base-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventDto } from '../../shared/dtos/event.dto';
import { EventCreateDto } from '../../shared/dtos/event-create.dto';

export class EventApi extends BaseApi {
  constructor(baseUrl: string, private http: HttpClient) {
    super(baseUrl + 'events');
  }

  public getAll(): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(this.url);
  }

  public getAllWithShifts(): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(this.url + '/withShifts/');
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
}
