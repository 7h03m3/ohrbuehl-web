import { EventDto } from '../dtos/event.dto';
import { Injectable } from '@angular/core';
import { EventShiftEditListItemDto } from '../../event-manager/components/event-shift-edit/dtos/event-shift-edit-list-item.dto';
import { OrganizationDto } from '../dtos/organization.dto';

@Injectable({ providedIn: 'root' })
export class SortHelper {
  public static sortOrganizationByPosition(organizationList: OrganizationDto[]) {
    organizationList.sort((a, b) => {
      if (a.position == 0) {
        return 1;
      }

      if (b.position == 0) {
        return -1;
      }

      if (a.position < b.position) {
        return -1;
      }

      if (a.position > b.position) {
        return 1;
      }

      return 0;
    });
  }

  public static sortEventsByDate(eventList: EventDto[], ascending: boolean) {
    eventList.sort((a, b) => {
      if (a.start > b.start) {
        return ascending ? 1 : -1;
      }

      if (a.start < b.start) {
        return ascending ? -1 : 1;
      }

      return 0;
    });
  }

  public static sortShiftList(shiftList: EventShiftEditListItemDto[]) {
    shiftList.sort((a, b) => {
      if (a.shift.category.position > b.shift.category.position) {
        return 1;
      }

      if (a.shift.category.position < b.shift.category.position) {
        return -1;
      }

      if (a.shift.start > b.shift.start) {
        return 1;
      }

      if (a.shift.start < b.shift.start) {
        return -1;
      }

      if (a.shift.organizationId > b.shift.organizationId) {
        return 1;
      }

      if (a.shift.organizationId < b.shift.organizationId) {
        return -1;
      }

      return 0;
    });
  }
}
