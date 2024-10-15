import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';
import { HttpClient } from '@angular/common/http';
import { ApplicationDto } from '../shared/dtos/application.dto';
import { ApplicationFileDto } from '../shared/dtos/application-file.dto';

@Injectable({
  providedIn: 'root',
})
export class ApplicationApiService extends BaseApi {
  constructor(private http: HttpClient) {
    super('application');
  }

  public getById(requestId: string) {
    return this.http.get<ApplicationDto>(this.url + '/' + requestId);
  }

  public create(dto: ApplicationDto) {
    return this.http.post<ApplicationDto>(this.url, dto);
  }

  public update(dto: ApplicationDto) {
    return this.http.put<ApplicationDto>(this.url, dto);
  }

  public submit(dto: ApplicationDto) {
    return this.http.put<void>(this.url + '/submit', dto);
  }

  public addFile(dto: ApplicationDto, fileDto: ApplicationFileDto, file: File) {
    const formData = new FormData();

    formData.append('dto', JSON.stringify(dto));
    formData.append('fileDto', JSON.stringify(fileDto));
    formData.append('file', file);

    return this.http.post<ApplicationDto>(this.url + '/file', formData);
  }

  public deleteFile(fileDto: ApplicationFileDto, requestId: string) {
    return this.http.delete<ApplicationDto>(this.url + '/file/' + requestId + '/' + fileDto.filename);
  }
}
