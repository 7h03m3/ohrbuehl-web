import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtLoginInformation } from '../shared/dtos/jwt-login-information.dto';
import { UserDto } from '../shared/dtos/user.dto';
import { UserCreateDto } from '../shared/dtos/user-create.dto';
import { UserUpdateDto } from '../shared/dtos/user-update.dto';
import { OrganizationDto } from '../shared/dtos/organization.dto';
import { OrganizationCreateDto } from '../shared/dtos/organization-create.dto';
import { BulletPriceDto } from '../shared/dtos/bullet-price.dto';
import { BulletPriceCreateDto } from '../shared/dtos/bullet-price-create.dto';
import { InvoiceDto } from '../shared/dtos/invoice.dto';
import { InvoiceCreateDto } from '../shared/dtos/invoice-create.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'http://127.0.0.1:3000/';
  userUrl: string = this.baseUrl + 'users';
  organizationUrl: string = this.baseUrl + 'organizations';
  bulletPricesUrl: string = this.baseUrl + 'bullet-prices';
  invoicesUrl: string = this.baseUrl + 'invoice';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<JwtLoginInformation> {
    return this.http.post<JwtLoginInformation>(this.baseUrl + 'auth/login', {
      username,
      password,
    });
  }

  getAllUser(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.userUrl);
  }

  public getUser(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(this.userUrl + '/' + id);
  }

  createUser(createUser: UserCreateDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.userUrl, createUser);
  }

  updateUser(updateUser: UserUpdateDto): Observable<UserDto> {
    return this.http.put<UserDto>(this.userUrl, updateUser);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.userUrl + '/' + id);
  }

  getAllOrganization(): Observable<OrganizationDto[]> {
    return this.http.get<OrganizationDto[]>(this.organizationUrl);
  }

  getAllNativeOrganization(): Observable<OrganizationDto[]> {
    return this.http.get<OrganizationDto[]>(this.organizationUrl + '/native');
  }

  public getOrganization(id: number): Observable<OrganizationDto> {
    return this.http.get<OrganizationDto>(this.organizationUrl + '/' + id);
  }

  createOrganization(
    createOrganization: OrganizationCreateDto
  ): Observable<OrganizationDto> {
    return this.http.post<OrganizationDto>(
      this.organizationUrl,
      createOrganization
    );
  }

  updateOrganization(
    updateOrganization: OrganizationDto
  ): Observable<OrganizationDto> {
    return this.http.put<OrganizationDto>(
      this.organizationUrl,
      updateOrganization
    );
  }

  deleteOrganization(id: string): Observable<any> {
    return this.http.delete(this.organizationUrl + '/' + id);
  }

  getAllBulletPrices(): Observable<BulletPriceDto[]> {
    return this.http.get<BulletPriceDto[]>(this.bulletPricesUrl);
  }

  public getBulletPrice(id: number): Observable<BulletPriceDto> {
    return this.http.get<BulletPriceDto>(this.bulletPricesUrl + '/' + id);
  }

  createBulletPrice(
    createBulletPrice: BulletPriceCreateDto
  ): Observable<BulletPriceDto> {
    return this.http.post<BulletPriceDto>(
      this.bulletPricesUrl,
      createBulletPrice
    );
  }

  updateBulletPrice(
    updateBulletPrice: BulletPriceDto
  ): Observable<BulletPriceDto> {
    return this.http.put<BulletPriceDto>(
      this.bulletPricesUrl,
      updateBulletPrice
    );
  }

  deleteBulletPrice(id: string): Observable<any> {
    return this.http.delete(this.bulletPricesUrl + '/' + id);
  }

  createInvoice(createDto: InvoiceCreateDto): Observable<InvoiceDto> {
    return this.http.post<InvoiceDto>(this.invoicesUrl, createDto);
  }

  getInvoicePdf(invoiceData: InvoiceDto) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.post(this.invoicesUrl + '/pdf', invoiceData, {
      observe: 'response',
      headers: headers,
      responseType: 'blob',
    });
  }
}
