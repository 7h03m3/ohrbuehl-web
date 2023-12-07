import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrganizationFeatureDto } from '../shared/dtos/organization-feature.dto';
import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class OrganizationFeatureApi extends BaseApi {
  constructor(private http: HttpClient) {
    super('organizations/feature');
  }

  public getAll(): Observable<OrganizationFeatureDto[]> {
    return this.http.get<OrganizationFeatureDto[]>(this.url + '/list');
  }

  public getByOrganizationId(id: number): Observable<OrganizationFeatureDto> {
    return this.http.get<OrganizationFeatureDto>(this.url + '/' + id);
  }

  public create(dto: OrganizationFeatureDto): Observable<OrganizationFeatureDto> {
    return this.http.post<OrganizationFeatureDto>(this.url, dto);
  }

  public update(dto: OrganizationFeatureDto): Observable<OrganizationFeatureDto> {
    return this.http.put<OrganizationFeatureDto>(this.url, dto);
  }
}
