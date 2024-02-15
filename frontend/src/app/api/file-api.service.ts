import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseApi } from './base-api';
import { Observable } from 'rxjs';
import { FileDto } from '../shared/dtos/file.dto';

@Injectable({
  providedIn: 'root',
})
export class FileApiService extends BaseApi {
  constructor(private http: HttpClient) {
    super('file');
  }

  public getAll(): Observable<FileDto[]> {
    return this.http.get<FileDto[]>(this.url);
  }

  public create(dto: FileDto, file: File): Observable<FileDto> {
    const formData = new FormData();

    formData.append('dto', JSON.stringify(dto));
    formData.append('file', file);

    return this.http.post<FileDto>(this.url, formData);
  }

  public update(dto: FileDto): Observable<FileDto> {
    return this.http.put<FileDto>(this.url, dto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id);
  }

  public download(downloadCode: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', '*/*');
    return this.http.get(this.url + '/download/' + downloadCode, {
      observe: 'response',
      headers: headers,
      responseType: 'blob',
    });
  }
}
