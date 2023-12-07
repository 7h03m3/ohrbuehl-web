import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class ReportApi extends BaseApi {
  constructor(private http: HttpClient) {
    super('reports');
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
