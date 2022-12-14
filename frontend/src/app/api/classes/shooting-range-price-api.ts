import { BaseApi } from './base-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShootingRangePriceDto } from '../../shared/dtos/shooting-range-price.dto';
import { ShootingRangePriceCreateDto } from '../../shared/dtos/shooting-range-price-create.dto';

export class ShootingRangePriceApi extends BaseApi {
  constructor(baseUrl: string, private http: HttpClient) {
    super(baseUrl + 'shooting-range-price');
  }

  public getAll(): Observable<ShootingRangePriceDto[]> {
    return this.http.get<ShootingRangePriceDto[]>(this.url);
  }

  public getById(id: number): Observable<ShootingRangePriceDto> {
    return this.http.get<ShootingRangePriceDto>(this.url + '/' + id);
  }

  public create(createBulletPrice: ShootingRangePriceCreateDto): Observable<ShootingRangePriceDto> {
    return this.http.post<ShootingRangePriceDto>(this.url, createBulletPrice);
  }

  public update(updateBulletPrice: ShootingRangePriceDto): Observable<ShootingRangePriceDto> {
    return this.http.put<ShootingRangePriceDto>(this.url, updateBulletPrice);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
