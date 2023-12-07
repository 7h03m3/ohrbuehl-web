import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessHoursDto } from '../shared/dtos/business-hours.dto';
import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class BusinessHourApi extends BaseApi {
  constructor(private http: HttpClient) {
    super('business-hours');
  }

  public getAll(): Observable<BusinessHoursDto[]> {
    return this.http.get<BusinessHoursDto[]>(this.url);
  }
}
