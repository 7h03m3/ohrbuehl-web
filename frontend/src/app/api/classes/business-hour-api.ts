import { BaseApi } from './base-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessHoursDto } from '../../shared/dtos/business-hours.dto';

export class BusinessHourApi extends BaseApi {
  constructor(baseUrl: string, private http: HttpClient) {
    super(baseUrl + 'business-hours');
  }

  public getAll(): Observable<BusinessHoursDto[]> {
    return this.http.get<BusinessHoursDto[]>(this.url);
  }
}
