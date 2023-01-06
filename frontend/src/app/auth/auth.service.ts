import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Role } from '../shared/enums/role.enum';
import { JwtLoginInformation } from '../shared/dtos/jwt-login-information.dto';
import { UserLocalData } from '../shared/classes/user-local-data';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService, private userData: UserLocalData, public jwtHelper: JwtHelperService) {}

  public login(username: string, password: string): Observable<JwtLoginInformation> {
    return this.api.login(username, password).pipe(
      map((result) => {
        this.userData.setSession(result);
        return result;
      }),
      catchError((err, caught) => {
        this.logout();
        return EMPTY;
      }),
    );
  }

  public logout() {
    this.userData.destroySession();
  }

  public isLoggedIn() {
    const accessToken = this.userData.getUserAccessToken();
    if (accessToken) {
      return this.jwtHelper.isTokenExpired(accessToken) == false;
    }

    return false;
  }

  public getRole(): Role {
    if (this.isLoggedIn() == false) {
      return Role.Anonymous;
    }

    return this.userData.getUserRoll();
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

  private isRole(requiredRole: Role): boolean {
    const userRole = this.getRole();
    return userRole == requiredRole || userRole == Role.Admin;
  }
}
