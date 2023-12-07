import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceDto } from '../../shared/dtos/invoice.dto';
import { InvoiceCreateDto } from '../../shared/dtos/invoice-create.dto';
import { InvoiceListItemDto } from '../../shared/dtos/invoice-list-item.dto';
import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class InvoiceApi extends BaseApi {
  constructor(private http: HttpClient) {
    super('invoice');
  }

  public getAll(year: number): Observable<InvoiceListItemDto[]> {
    return this.http.get<InvoiceListItemDto[]>(this.url + '/year/' + year);
  }

  public getById(id: number): Observable<InvoiceDto> {
    return this.http.get<InvoiceDto>(this.url + '/' + id);
  }

  public create(createDto: InvoiceCreateDto): Observable<InvoiceDto> {
    return this.http.post<InvoiceDto>(this.url, createDto);
  }

  public update(updateDto: InvoiceDto): Observable<InvoiceDto> {
    return this.http.put<InvoiceDto>(this.url, updateDto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id);
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
