import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactMessageDto } from '../shared/dtos/contact-message.dto';
import { ContactMessageStatus } from '../shared/enums/contact-message-status.enum';
import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class ContactMessageApi extends BaseApi {
  constructor(private http: HttpClient) {
    super('contact-message');
  }

  public getAll(): Observable<ContactMessageDto[]> {
    return this.http.get<ContactMessageDto[]>(this.url);
  }

  public add(dto: ContactMessageDto): Observable<ContactMessageDto> {
    return this.http.post<ContactMessageDto>(this.url, dto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  public setStatus(dto: ContactMessageDto): Observable<ContactMessageDto> {
    return this.http.put<ContactMessageDto>(this.url + '/status', dto);
  }

  public getStatusCount(status: ContactMessageStatus): Observable<number> {
    return this.http.get<number>(this.url + '/status/count/' + status);
  }
}
