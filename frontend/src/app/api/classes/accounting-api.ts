import { ShootingRangeAccountingDto } from '../../shared/dtos/shooting-range-accounting.dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseApi } from './base-api';

export class AccountingApi extends BaseApi {
  constructor(baseUrl: string, private http: HttpClient) {
    super(baseUrl + 'shooting-range-accounting');
  }

  public create(createDto: ShootingRangeAccountingDto): Observable<ShootingRangeAccountingDto> {
    return this.http.post<ShootingRangeAccountingDto>(this.url, createDto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id);
  }

  public getList(): Observable<ShootingRangeAccountingDto[]> {
    return this.http.get<ShootingRangeAccountingDto[]>(this.url);
  }

  public getById(id: number): Observable<ShootingRangeAccountingDto> {
    return this.http.get<ShootingRangeAccountingDto>(this.url + '/' + id);
  }

  public update(dto: ShootingRangeAccountingDto): Observable<ShootingRangeAccountingDto> {
    return this.http.put<ShootingRangeAccountingDto>(this.url, dto);
  }

  public getPdf(id: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(this.url + '/pdf/' + id, {
      observe: 'response',
      headers: headers,
      responseType: 'blob',
    });
  }
}
