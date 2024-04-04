import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, Subject } from 'rxjs';
import { Role } from '../shared/enums/role.enum';
import { JwtLoginInformation } from '../shared/dtos/jwt-login-information.dto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserPasswordChangeDto } from '../shared/dtos/user-password-change.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl;
  private readonly accessTokenKey = 'accessToken';
  private readonly userIdKey = 'userId';
  private readonly userNameKey = 'userName';
  private readonly userRolesKey = 'userRoles';
  private readonly userAssignedOrganizationKey = 'userAssignedOrganizationId';
  private managingOrganizationId = 0;
  private loginSubject = new Subject<JwtLoginInformation>();
  private loginInformation: JwtLoginInformation | null;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {
    this.baseUrl = environment.backendBaseUrl;
    this.loginInformation = null;
  }

  public getLogin() {
    if (this.loginInformation == null) {
      this.loginInformation = new JwtLoginInformation();
      this.loginInformation.userName = this.getUserName();
      this.loginInformation.id = this.getUserId();
      this.loginInformation.roles = this.getUserRoll();
      this.loginInformation.access_token = this.getUserAccessToken();
    }
    return this.loginInformation;
  }

  public getLoginSubject() {
    return this.loginSubject;
  }

  public login(username: string, password: string): Observable<JwtLoginInformation> {
    return this.loginRequest(username, password).pipe(
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

  public changePassword(dto: UserPasswordChangeDto): Observable<any> {
    return this.http.put<UserPasswordChangeDto>(this.baseUrl + 'auth/password', dto);
  }

  public getManagingOrganizationId(): number {
    if (this.isAdmin() && this.managingOrganizationId != 0) {
      return this.managingOrganizationId;
    }

    if (this.managingOrganizationId == 0) {
      this.managingOrganizationId = this.getAssignedOrganizationId();
    }

    return this.managingOrganizationId;
  }

  public setManagingOrganizationId(organizationId: number) {
    this.managingOrganizationId = organizationId;
  }

  public getUserId(): number {
    const id = sessionStorage.getItem(this.userIdKey);
    return id != null ? +id : 0;
  }

  public getUserName(): string {
    const name = sessionStorage.getItem(this.userNameKey);
    return name != null ? name : '';
  }

  public isUserAccessTokenSet(): boolean {
    return this.getUserAccessToken().length != 0;
  }

  public logout() {
    this.destroySession();
  }

  public isLoggedIn() {
    const accessToken = this.getUserAccessToken();
    if (accessToken.length != 0) {
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

  public isSingleShooter(): boolean {
    return this.isRole(Role.SingleShooter);
  }

  public getUserAccessToken(): string {
    const token = sessionStorage.getItem(this.accessTokenKey);
    return token != null ? token : '';
  }

  public getAssignedOrganizationId(): number {
    const idString = sessionStorage.getItem(this.userAssignedOrganizationKey);
    if (idString != null) {
      return Number.parseInt(idString);
    }

    return 0;
  }

  private getUserRoll(): Role {
    const role = sessionStorage.getItem(this.userRolesKey);
    if (!role) {
      return Role.Anonymous;
    }

    return role as Role;
  }

  private destroySession() {
    this.loginInformation = new JwtLoginInformation();
    this.loginSubject.next(this.loginInformation);
    this.managingOrganizationId = 0;
    sessionStorage.removeItem(this.accessTokenKey);
    sessionStorage.removeItem(this.userIdKey);
    sessionStorage.removeItem(this.userNameKey);
    sessionStorage.removeItem(this.userRolesKey);
    sessionStorage.removeItem(this.userAssignedOrganizationKey);
  }

  private setSession(loginInformation: JwtLoginInformation) {
    this.loginInformation = loginInformation;
    this.loginSubject.next(this.loginInformation);
    sessionStorage.setItem(this.accessTokenKey, loginInformation.access_token);
    sessionStorage.setItem(this.userIdKey, loginInformation.id.toString());
    sessionStorage.setItem(this.userNameKey, loginInformation.userName);
    sessionStorage.setItem(this.userRolesKey, loginInformation.roles);
    sessionStorage.setItem(this.userAssignedOrganizationKey, loginInformation.assignedOrganizationId.toString());
  }

  private isRole(requiredRole: Role): boolean {
    const userRole = this.getRole();
    return userRole == requiredRole || userRole == Role.Admin;
  }

  private loginRequest(username: string, password: string): Observable<JwtLoginInformation> {
    return this.http.post<JwtLoginInformation>(this.baseUrl + 'auth/login', {
      username,
      password,
    });
  }
}
