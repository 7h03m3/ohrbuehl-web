import { BaseApi } from './base-api';
import { HttpClient } from '@angular/common/http';

export class BusinessHoursApi extends BaseApi {
  constructor(baseUrl: string, private http: HttpClient) {
    super(baseUrl + 'business-hours');
  }
}
