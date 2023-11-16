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
import { OrganizationMemberApi } from './classes/organization-member-api';
import { EventCategoryApi } from './classes/event-category-api';
import { EventShiftCategoryApi } from './classes/event-shift-category-api';
import { EventApi } from './classes/event-api';
import { EventShiftApi } from './classes/event-shift-api';
import { EventStaffPoolApi } from './classes/event-staff-pool-api';
import { UserPasswordChangeDto } from '../shared/dtos/user-password-change.dto';
import { NotificationApi } from './classes/notification-api';
import { BusinessHourAdminApi } from './classes/business-hour-admin-api';
import { BusinessHourOrganizationApi } from './classes/business-hour-organization-api';
import { BusinessHourSingleShooterApi } from './classes/business-hour-single-shooter-api';
import { BusinessHourApi } from './classes/business-hour-api';
import { ContactMessageApi } from './classes/contact-message-api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.backendBaseUrl;
  private readonly accountingApi: AccountingApi;
  private readonly organizationApi: OrganizationApi;
  private readonly organizationMemberApi: OrganizationMemberApi;
  private readonly shootingRangePriceApi: ShootingRangePriceApi;
  private readonly invoiceApi: InvoiceApi;
  private readonly invoiceItemApi: InvoiceItemApi;
  private readonly userApi: UserApi;
  private readonly eventApi: EventApi;
  private readonly eventShiftApi: EventShiftApi;
  private readonly eventCategoryApi: EventCategoryApi;
  private readonly eventShiftCategoryApi: EventShiftCategoryApi;
  private readonly eventStaffPoolApi: EventStaffPoolApi;
  private readonly notificationApi: NotificationApi;
  private readonly businessHoursApi: BusinessHourApi;
  private readonly businessHoursAdminApi: BusinessHourAdminApi;
  private readonly businessHoursOrganizationApi: BusinessHourOrganizationApi;
  private readonly businessHoursSingleShooterApi: BusinessHourSingleShooterApi;
  private readonly contactMessageApi: ContactMessageApi;

  constructor(private http: HttpClient) {
    this.accountingApi = new AccountingApi(this.baseUrl, this.http);
    this.organizationApi = new OrganizationApi(this.baseUrl, this.http);
    this.organizationMemberApi = new OrganizationMemberApi(this.baseUrl, this.http);
    this.shootingRangePriceApi = new ShootingRangePriceApi(this.baseUrl, this.http);
    this.invoiceApi = new InvoiceApi(this.baseUrl, this.http);
    this.invoiceItemApi = new InvoiceItemApi(this.baseUrl, this.http);
    this.userApi = new UserApi(this.baseUrl, this.http);
    this.eventApi = new EventApi(this.baseUrl, this.http);
    this.eventShiftApi = new EventShiftApi(this.baseUrl, this.http);
    this.eventCategoryApi = new EventCategoryApi(this.baseUrl, this.http);
    this.eventShiftCategoryApi = new EventShiftCategoryApi(this.baseUrl, this.http);
    this.eventStaffPoolApi = new EventStaffPoolApi(this.baseUrl, this.http);
    this.notificationApi = new NotificationApi(this.baseUrl, this.http);
    this.businessHoursApi = new BusinessHourApi(this.baseUrl, this.http);
    this.businessHoursAdminApi = new BusinessHourAdminApi(this.baseUrl, this.http);
    this.businessHoursOrganizationApi = new BusinessHourOrganizationApi(this.baseUrl, this.http);
    this.businessHoursSingleShooterApi = new BusinessHourSingleShooterApi(this.baseUrl, this.http);
    this.contactMessageApi = new ContactMessageApi(this.baseUrl, this.http);
  }

  public login(username: string, password: string): Observable<JwtLoginInformation> {
    return this.http.post<JwtLoginInformation>(this.baseUrl + 'auth/login', {
      username,
      password,
    });
  }

  public changePassword(dto: UserPasswordChangeDto): Observable<any> {
    return this.http.put<UserPasswordChangeDto>(this.baseUrl + 'auth/password', dto);
  }

  public getUser(): UserApi {
    return this.userApi;
  }

  public getInvoice(): InvoiceApi {
    return this.invoiceApi;
  }

  public getInvoiceItem(): InvoiceItemApi {
    return this.invoiceItemApi;
  }

  public getAccounting(): AccountingApi {
    return this.accountingApi;
  }

  public getOrganization(): OrganizationApi {
    return this.organizationApi;
  }

  public getOrganizationMember(): OrganizationMemberApi {
    return this.organizationMemberApi;
  }

  public getShootingRangePrice(): ShootingRangePriceApi {
    return this.shootingRangePriceApi;
  }

  public getEvent(): EventApi {
    return this.eventApi;
  }

  public getEventShift(): EventShiftApi {
    return this.eventShiftApi;
  }

  public getEventCategory(): EventCategoryApi {
    return this.eventCategoryApi;
  }

  public getEventShiftCategory(): EventShiftCategoryApi {
    return this.eventShiftCategoryApi;
  }

  public getStaffPool(): EventStaffPoolApi {
    return this.eventStaffPoolApi;
  }

  public getNotification(): NotificationApi {
    return this.notificationApi;
  }

  public getBusinessHours(): BusinessHourApi {
    return this.businessHoursApi;
  }

  public getBusinessHoursAdmin(): BusinessHourAdminApi {
    return this.businessHoursAdminApi;
  }

  public getBusinessHoursOrganization(): BusinessHourOrganizationApi {
    return this.businessHoursOrganizationApi;
  }

  public getBusinessHoursSingleShooter(): BusinessHourSingleShooterApi {
    return this.businessHoursSingleShooterApi;
  }

  public getContactMessage(): ContactMessageApi {
    return this.contactMessageApi;
  }
}
