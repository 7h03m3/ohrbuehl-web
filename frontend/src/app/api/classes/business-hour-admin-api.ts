import { BaseApi } from './base-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessHoursDto } from '../../shared/dtos/business-hours.dto';
import { BusinessHoursCreateDto } from '../../shared/dtos/business-hours-create.dto';
import { BusinessHourReservationDto } from '../../shared/dtos/business-hour-reservation.dto';

export class BusinessHourAdminApi extends BaseApi {
  constructor(baseUrl: string, private http: HttpClient) {
    super(baseUrl + 'business-hours/admin');
  }

  public getAll(): Observable<BusinessHoursDto[]> {
    return this.http.get<BusinessHoursDto[]>(this.url);
  }

  public getById(id: number): Observable<BusinessHoursDto> {
    return this.http.get<BusinessHoursDto>(this.url + '/' + id);
  }

  public create(createDto: BusinessHoursCreateDto): Observable<BusinessHoursDto> {
    return this.http.post<BusinessHoursDto>(this.url, createDto);
  }

  public update(updateDto: BusinessHoursDto): Observable<BusinessHoursDto> {
    return this.http.put<BusinessHoursDto>(this.url, updateDto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  public createReservation(dto: BusinessHourReservationDto): Observable<BusinessHourReservationDto> {
    return this.http.post<BusinessHourReservationDto>(this.url + '/reservation', dto);
  }

  public deleteReservation(id: number): Observable<any> {
    return this.http.delete(this.url + '/reservation/' + id);
  }
}
