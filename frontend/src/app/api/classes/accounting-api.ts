import { ShootingRangeAccountingDto } from '../../shared/dtos/shooting-range-accounting.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseApi } from './base-api';

export class AccountingApi extends BaseApi {
  constructor(baseUrl: string, private http: HttpClient) {
    super(baseUrl + 'shooting-range-accounting');
  }

  public create(createDto: ShootingRangeAccountingDto): Observable<ShootingRangeAccountingDto> {
    return this.http.post<ShootingRangeAccountingDto>(this.url, createDto);
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
}
