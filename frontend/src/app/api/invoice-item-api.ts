import { HttpClient } from '@angular/common/http';
import { InvoiceItemDto } from '../shared/dtos/invoice-item.dto';
import { Observable } from 'rxjs';
import { InvoiceDto } from '../shared/dtos/invoice.dto';
import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class InvoiceItemApi extends BaseApi {
  constructor(private http: HttpClient) {
    super('invoice/item');
  }

  public create(createDto: InvoiceItemDto): Observable<number> {
    return this.http.post<number>(this.url, createDto);
  }

  public update(updateDto: InvoiceItemDto): Observable<InvoiceDto> {
    return this.http.put<InvoiceDto>(this.url, updateDto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id);
  }
}
