import { Injectable } from '@nestjs/common';
import { EventShiftEntity } from '../../database/entities/event-shift.entity';
import { EventEntity } from '../../database/entities/event.entity';
import { OrganizationMemberEntity } from '../../database/entities/organization-member.entity';

@Injectable()
export class SortHelper {
  public sortShiftList(shiftList: EventShiftEntity[]) {
    shiftList.sort((a, b) => {
      if (a.category.position > b.category.position) {
        return 1;
      }

      if (a.category.position < b.category.position) {
        return -1;
      }

      if (a.start > b.start) {
        return 1;
      }

      if (a.start < b.start) {
        return -1;
      }

      if (a.organizationId > b.organizationId) {
        return 1;
      }

      if (a.organizationId < b.organizationId) {
        return -1;
      }

      return 0;
    });
  }

  public sortEventsByDate(eventList: EventEntity[]) {
    eventList.sort((a, b) => {
      if (a.start > b.start) {
        return 1;
      }

      if (a.start < b.start) {
        return -1;
      }

      return 0;
    });
  }

  public sortOrganizationMemberByName(memberList: OrganizationMemberEntity[]) {
    memberList.sort((a, b) => {
      if (a.firstName < b.firstName) {
        return -1;
      }
      if (a.firstName > b.firstName) {
        return 1;
      }

      if (a.lastName < b.lastName) {
        return -1;
      }
      if (a.lastName > b.lastName) {
        return 1;
      }

      return 0;
    });
  }
}
