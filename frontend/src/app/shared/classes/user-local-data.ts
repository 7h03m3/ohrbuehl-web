import { Injectable } from '@angular/core';
import { Role } from '../enums/role.enum';
import { JwtLoginInformation } from '../dtos/jwt-login-information.dto';

@Injectable({
  providedIn: 'root',
})
export class UserLocalData {
  accessTokenKey = 'accessToken';
  userIdKey = 'userId';
  userRolesKey = 'userRoles';

  constructor() {}

  public getUserAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  public isUserAccessTokenSet(): boolean {
    const accessToken = this.getUserAccessToken();

    if (accessToken) {
      return true;
    }

    return false;
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
      case Role.Cashier:
        return Role.Cashier;
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
      case 'admin':
        return 'Administrator';
      case 'user':
        return 'Benutzer';
      case 'shootingRangeManager':
        return 'Standwart';
      case 'clubPresident':
        return 'Vereinspräsident';
      case 'eventOrganizer':
        return 'Anlassorganisator';
      case 'cashier':
        return 'Kassier';
      default:
        return '';
    }
  }

  public convertPriceTypeText(type: string) {
    switch (type) {
      case 'Section_300m':
        return '300m';
      case 'Section_100m':
        return '100m';
      case 'Section_50m':
        return '50m';
      case 'Section_25m':
        return '25m';
      default:
        return '';
    }
  }

  public convertAccountingTypeText(type: string) {
    switch (type) {
      case 'Section_300m':
        return '300m';
      case 'Section_100m':
        return '100m';
      case 'Section_50m':
        return '50m';
      case 'Section_25m':
        return '25m';
      default:
        return '';
    }
  }

  public convertAccountingSelectionTypeText(type: string) {
    switch (type) {
      case 'Section_300m_SIUS_file':
        return '300m (SIUS Data Datei)';
      case 'Section_300m_manual':
        return '300m (manuell)';
      default:
        return '';
    }
  }

  public convertInvoiceTypeText(type: string) {
    switch (type) {
      case 'Invoice_Custom':
        return 'Benutzerdefiniert';
      case 'Invoice_Shooting_Range_Accounting_Daily':
        return 'Schussgeldrechnung (Tag)';
      case 'Invoice_Shooting_Range_Accounting_Military_25_50_100m':
        return 'Schussgeldrechnung Militär (25m/50m/100m)';
      default:
        return '';
    }
  }
}
