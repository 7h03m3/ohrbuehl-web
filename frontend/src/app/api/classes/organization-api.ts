import { HttpClient } from '@angular/common/http';
import { BaseApi } from './base-api';
import { Observable } from 'rxjs';
import { OrganizationDto } from '../../shared/dtos/organization.dto';
import { OrganizationCreateDto } from '../../shared/dtos/organization-create.dto';
import { ShootingRangeAccountingTypeEnum } from '../../shared/enums/shooting-range-accounting-type.enum';

export class OrganizationApi extends BaseApi {
  constructor(baseUrl: string, private http: HttpClient) {
    super(baseUrl + 'organizations');
  }

  public getAll(): Observable<OrganizationDto[]> {
    return this.http.get<OrganizationDto[]>(this.url);
  }

  public getAllNative(): Observable<OrganizationDto[]> {
    return this.http.get<OrganizationDto[]>(this.url + '/native');
  }

  public getByAccountingType(accountingType: ShootingRangeAccountingTypeEnum): Observable<OrganizationDto[]> {
    switch (accountingType) {
      case ShootingRangeAccountingTypeEnum.Section_300m:
        return this.getAll300m();
      case ShootingRangeAccountingTypeEnum.Section_100m:
        return this.getAll100m();
      case ShootingRangeAccountingTypeEnum.Section_50m:
        return this.getAll50m();
      case ShootingRangeAccountingTypeEnum.Section_25m:
        return this.getAll25m();
      default:
        return this.getAll();
    }
  }

  public getAll300m(): Observable<OrganizationDto[]> {
    return this.http.get<OrganizationDto[]>(this.url + '/300m');
  }

  public getAll100m(): Observable<OrganizationDto[]> {
    return this.http.get<OrganizationDto[]>(this.url + '/100m');
  }

  public getAll50m(): Observable<OrganizationDto[]> {
    return this.http.get<OrganizationDto[]>(this.url + '/50m');
  }

  public getAll25m(): Observable<OrganizationDto[]> {
    return this.http.get<OrganizationDto[]>(this.url + '/25m');
  }

  public getById(id: number): Observable<OrganizationDto> {
    return this.http.get<OrganizationDto>(this.url + '/' + id);
  }

  public create(createOrganization: OrganizationCreateDto): Observable<OrganizationDto> {
    return this.http.post<OrganizationDto>(this.url, createOrganization);
  }

  public update(updateOrganization: OrganizationDto): Observable<OrganizationDto> {
    return this.http.put<OrganizationDto>(this.url, updateOrganization);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
