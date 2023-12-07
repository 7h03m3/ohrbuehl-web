import { BaseApi } from './base-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class ReportApi extends BaseApi {
  constructor(baseUrl: string, private http: HttpClient) {
    super(baseUrl + 'reports');
  }

  public getShootingRangeAccountingByOrganization(organizationId: number, year: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(this.url + '/shooting-range-accounting/' + year + '/' + organizationId, {
      observe: 'response',
      headers: headers,
      responseType: 'blob',
    });
  }
}
