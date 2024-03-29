import { BaseApi } from './base-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrganizationMemberDto } from '../../shared/dtos/organization-member.dto';
import { OrganizationMemberCreateDto } from '../../shared/dtos/organization-member-create.dto';

export class OrganizationMemberApi extends BaseApi {
  constructor(baseUrl: string, private http: HttpClient) {
    super(baseUrl + 'organizations/member');
  }

  public getAll(): Observable<OrganizationMemberDto[]> {
    return this.http.get<OrganizationMemberDto[]>(this.url);
  }

  public getAllByOrganization(organizationId: number): Observable<OrganizationMemberDto[]> {
    return this.http.get<OrganizationMemberDto[]>(this.url + '/byOrganization/' + organizationId);
  }

  public getAllDetailedByOrganization(organizationId: number): Observable<OrganizationMemberDto[]> {
    return this.http.get<OrganizationMemberDto[]>(this.url + '/byOrganizationDetailed/' + organizationId);
  }

  public getById(id: number): Observable<OrganizationMemberDto> {
    return this.http.get<OrganizationMemberDto>(this.url + '/' + id);
  }

  public create(dto: OrganizationMemberCreateDto): Observable<OrganizationMemberDto> {
    return this.http.post<OrganizationMemberDto>(this.url, dto);
  }

  public update(dto: OrganizationMemberDto): Observable<OrganizationMemberDto> {
    return this.http.put<OrganizationMemberDto>(this.url, dto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
