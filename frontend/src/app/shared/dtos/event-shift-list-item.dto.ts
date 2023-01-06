import { EventShiftDto } from './event-shift.dto';
import { OrganizationMemberDto } from './organization-member.dto';

export class EventShiftListItemDto {
  shift: EventShiftDto;
  disableStaffList: boolean;
  staffList: OrganizationMemberDto[];

  constructor() {
    this.shift = new EventShiftDto();
    this.disableStaffList = true;
    this.staffList = new Array<OrganizationMemberDto>();
  }
}
