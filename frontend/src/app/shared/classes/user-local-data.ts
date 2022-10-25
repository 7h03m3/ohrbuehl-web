import {Injectable} from "@angular/core";
import {Role} from "../enums/role.enum";
import {JwtLoginInformation} from "../dtos/jwt-login-information.dto";

@Injectable({
  providedIn: 'root'
})

export class UserLocalData {
  accessTokenKey: string = 'accessToken';
  userIdKey: string = 'userId';
  userRolesKey: string = 'userRoles';

  constructor() {
  }

  public getUserAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  public isUserAccessTokenSet(): boolean {
    const accessToken = this.getUserAccessToken();

    if (accessToken) {
      return true;
    }

    return false
  }

  public getUserRoll(): Role {
    const role = localStorage.getItem(this.userRolesKey);
    if (!role) {
      return Role.Anonymous;
    }

    switch (role) {
      case Role.User:
        return Role.User;
      case Role.ShootingRangeManager:
        return Role.ShootingRangeManager;
      case Role.ClubPresident:
        return Role.ClubPresident;
      case Role.EventOrganizer:
        return Role.EventOrganizer;
      case Role.Admin:
        return Role.Admin;
      default:

        return Role.Anonymous;
    }
  }

  public destroySession() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.userIdKey);
    localStorage.removeItem(this.userRolesKey);
  }

  public setSession(loginInformation: JwtLoginInformation) {
    localStorage.setItem(this.accessTokenKey, loginInformation.access_token);
    localStorage.setItem(this.userIdKey, loginInformation.id.toString());
    localStorage.setItem(this.userRolesKey, loginInformation.roles);
  }

  public convertRoleText(role: string) {
    switch (role) {
      case "admin":
        return "Administrator";
      case "user":
        return "Benutzer";
      case "shootingRangeManager":
        return "Standwart";
      case "clubPresident":
        return "Vereinspräsident";
      case "eventOrganizer":
        return "Anlassorganisator";
      default:
        return "";
    }
  }
}
