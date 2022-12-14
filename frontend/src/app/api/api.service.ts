import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtLoginInformation } from '../shared/dtos/jwt-login-information.dto';
import { environment } from '../../environments/environment';
import { AccountingApi } from './classes/accounting-api';
import { OrganizationApi } from './classes/organization-api';
import { ShootingRangePriceApi } from './classes/shooting-range-price-api';
import { InvoiceApi } from './classes/invoice-api';
import { InvoiceItemApi } from './classes/invoice-item-api';
import { UserApi } from './classes/user-api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.backendBaseUrl;
  private readonly accountingApi: AccountingApi;
  private readonly organizationApi: OrganizationApi;
  private readonly shootingRangePriceApi: ShootingRangePriceApi;
  private readonly invoiceApi: InvoiceApi;
  private readonly invoiceItemApi: InvoiceItemApi;
  private readonly userApi: UserApi;

  constructor(private http: HttpClient) {
    this.accountingApi = new AccountingApi(this.baseUrl, this.http);
    this.organizationApi = new OrganizationApi(this.baseUrl, this.http);
    this.shootingRangePriceApi = new ShootingRangePriceApi(this.baseUrl, this.http);
    this.invoiceApi = new InvoiceApi(this.baseUrl, this.http);
    this.invoiceItemApi = new InvoiceItemApi(this.baseUrl, this.http);
    this.userApi = new UserApi(this.baseUrl, this.http);
  }

  login(username: string, password: string): Observable<JwtLoginInformation> {
    return this.http.post<JwtLoginInformation>(this.baseUrl + 'auth/login', {
      username,
      password,
    });
  }

  getUser(): UserApi {
    return this.userApi;
  }

  getInvoice(): InvoiceApi {
    return this.invoiceApi;
  }

  getInvoiceItem(): InvoiceItemApi {
    return this.invoiceItemApi;
  }

  getAccounting(): AccountingApi {
    return this.accountingApi;
  }

  getOrganization(): OrganizationApi {
    return this.organizationApi;
  }

  getShootingRangePrice(): ShootingRangePriceApi {
    return this.shootingRangePriceApi;
  }
}
