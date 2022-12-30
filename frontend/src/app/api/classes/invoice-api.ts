import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseApi } from './base-api';
import { Observable } from 'rxjs';
import { InvoiceDto } from '../../shared/dtos/invoice.dto';
import { InvoiceCreateDto } from '../../shared/dtos/invoice-create.dto';
import { InvoiceListItemDto } from '../../shared/dtos/invoice-list-item.dto';

export class InvoiceApi extends BaseApi {
  constructor(baseUrl: string, private http: HttpClient) {
    super(baseUrl + 'invoice');
  }

  public getAll(): Observable<InvoiceListItemDto[]> {
    return this.http.get<InvoiceListItemDto[]>(this.url);
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
