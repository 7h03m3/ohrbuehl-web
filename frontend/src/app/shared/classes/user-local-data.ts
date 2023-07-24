import { Injectable } from '@angular/core';
import { NotificationSource } from '../enums/notification-source.enum';

@Injectable({
  providedIn: 'root',
})
export class UserLocalData {
  private eventCategoryKey = 'eventCategoryId';
  private currentDateKey = 'currentDate';

  constructor() {}

  public static convertNotificationSourceText(source: NotificationSource) {
    switch (source) {
      case NotificationSource.Invoice:
        return 'Rechnung';
      case NotificationSource.ShootingRangeAccounting:
        return 'Schussgeld';
      default:
        return '';
    }
  }

  public getEventCategory(): number {
    const eventCategoryId = localStorage.getItem(this.eventCategoryKey);

    if (eventCategoryId != null) {
      return parseInt(eventCategoryId);
    }

    return 0;
  }

  public setEventCategory(eventCategoryId: number) {
    localStorage.setItem(this.eventCategoryKey, eventCategoryId.toString());
  }

  public setDate(date: Date) {
    sessionStorage.setItem(this.currentDateKey, date.getTime().toString());
  }

  public getDate(): Date {
    const time = sessionStorage.getItem(this.currentDateKey);

    if (time != null) {
      return new Date(parseInt(time));
    }

    const now = new Date(Date.now());
    this.setDate(now);
    return now;
  }

  public convertRoleText(role: string) {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'user':
        return 'Benutzer';
      case 'shootingRangeManager':
        return 'Standwart';
      case 'organizationManager':
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
      case 'Invoice_Shooting_Range_Accounting_Time_Range':
        return 'Schussgeldrechnung (Zeitraum)';
      case 'Invoice_Shooting_Range_Accounting_Military_25_50_100m':
        return 'Schussgeldrechnung Militär (25m/50m/100m)';
      default:
        return '';
    }
  }
}
