import { EventShiftDto } from '../../../../shared/dtos/event-shift.dto';
import { OrganizationMemberDto } from '../../../../shared/dtos/organization-member.dto';

export class EventShiftEditListItemDto {
  shift: EventShiftDto;
  disableStaffList: boolean;
  staffList: OrganizationMemberDto[];
  number: number;

  constructor() {
    this.shift = new EventShiftDto();
    this.disableStaffList = true;
    this.staffList = new Array<OrganizationMemberDto>();
    this.number = 0;
  }
}
