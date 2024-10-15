import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApplicationDto } from '../shared/dtos/application.dto';
import { Observable } from 'rxjs';
import { ApplicationFileDto } from '../shared/dtos/application-file.dto';

@Injectable({
  providedIn: 'root',
})
export class ApplicationAdminApiService extends BaseApi {
  constructor(private http: HttpClient) {
    super('application-admin');
  }

  public getAll() {
    return this.http.get<ApplicationDto[]>(this.url);
  }

  public getById(id: number) {
    return this.http.get<ApplicationDto>(this.url + '/' + id);
  }

  public getCount() {
    return this.http.get<number>(this.url + '/count');
  }

  public update(dto: ApplicationDto) {
    return this.http.put<ApplicationDto>(this.url, dto);
  }

  public setState(dto: ApplicationDto) {
    return this.http.put<ApplicationDto>(this.url + '/state/', dto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  public downloadFile(fileDto: ApplicationFileDto) {
    return this.http.get<Blob>(this.url + '/file/' + fileDto.id, {
      observe: 'response',
      responseType: 'blob' as 'json',
    });
  }

  public downloadSheet(dto: ApplicationDto) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(this.url + '/sheet/' + dto.id, {
      observe: 'response',
      headers: headers,
      responseType: 'blob',
    });
  }
}
