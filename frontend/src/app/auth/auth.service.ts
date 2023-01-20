import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { catchError, EMPTY, lastValueFrom, map, Observable } from 'rxjs';
import { Role } from '../shared/enums/role.enum';
import { JwtLoginInformation } from '../shared/dtos/jwt-login-information.dto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OrganizationApi } from '../api/classes/organization-api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly accessTokenKey = 'accessToken';
  private readonly userIdKey = 'userId';
  private readonly userRolesKey = 'userRoles';
  private organizationApi: OrganizationApi;
  private managingOrganizationId = 0;

  constructor(private apiService: ApiService, public jwtHelper: JwtHelperService) {
    this.organizationApi = this.apiService.getOrganization();
  }

  public login(username: string, password: string): Observable<JwtLoginInformation> {
    return this.apiService.login(username, password).pipe(
      map((result) => {
        this.setSession(result);
        return result;
      }),
      catchError(() => {
        this.logout();
        return EMPTY;
      }),
    );
  }

  public async getManagingOrganizationId(): Promise<number> {
    if (this.isAdmin() && this.managingOrganizationId != 0) {
      return this.managingOrganizationId;
    }

    if (this.managingOrganizationId == 0) {
      this.managingOrganizationId = await this.queryManagingOrganizationId();
    }

    return this.managingOrganizationId;
  }

  public setManagingOrganizationId(organizationId: number) {
    this.managingOrganizationId = organizationId;
  }

  public getUserId(): number {
    const idString = localStorage.getItem(this.userIdKey);
    if (idString == null) {
      return 0;
    }

    return +idString;
  }

  public isUserAccessTokenSet(): boolean {
    const accessToken = this.getUserAccessToken();

    return !!accessToken;
  }

  public logout() {
    this.destroySession();
  }

  public isLoggedIn() {
    const accessToken = this.getUserAccessToken();
    if (accessToken) {
      return !this.jwtHelper.isTokenExpired(accessToken);
    }

    return false;
  }

  public getRole(): Role {
    if (!this.isLoggedIn()) {
      return Role.Anonymous;
    }

    return this.getUserRoll();
  }

  public isAdmin(): boolean {
    return this.getRole() == Role.Admin;
  }

  public isShootingRangeManager(): boolean {
    return this.isRole(Role.ShootingRangeManager);
  }

  public isOrganizationManager(): boolean {
    return this.isRole(Role.OrganizationManager);
  }

  public isEventOrganizer(): boolean {
    return this.isRole(Role.EventOrganizer);
  }

  public getUserAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  private async queryManagingOrganizationId(): Promise<number> {
    const managerId$ = this.organizationApi.getByManagerId(this.getUserId());
    const organizationDto = await lastValueFrom(managerId$);
    if (organizationDto) {
      return organizationDto.id;
    } else {
      return 0;
    }
  }

  private getUserRoll(): Role {
    const role = localStorage.getItem(this.userRolesKey);
    if (!role) {
      return Role.Anonymous;
    }

    switch (role) {
      case Role.User:
        return Role.User;
      case Role.ShootingRangeManager:
        return Role.ShootingRangeManager;
      case Role.OrganizationManager:
        return Role.OrganizationManager;
      case Role.EventOrganizer:
        return Role.EventOrganizer;
      case Role.Admin:
        return Role.Admin;
      case Role.Cashier:
        return Role.Cashier;
      default:
        return Role.Anonymous;
    }
  }

  private destroySession() {
    this.managingOrganizationId = 0;
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.userIdKey);
    localStorage.removeItem(this.userRolesKey);
  }

  private setSession(loginInformation: JwtLoginInformation) {
    this.managingOrganizationId = 0;
    localStorage.setItem(this.accessTokenKey, loginInformation.access_token);
    localStorage.setItem(this.userIdKey, loginInformation.id.toString());
    localStorage.setItem(this.userRolesKey, loginInformation.roles);
  }

  private isRole(requiredRole: Role): boolean {
    const userRole = this.getRole();
    return userRole == requiredRole || userRole == Role.Admin;
  }
}
