import { OrganizationDto } from './organization.dto';
import { EventShiftDto } from './event-shift.dto';

export class OrganizationMemberCreateDto {
  firstName: string;
  lastName: string;
  birthdate: number;
  vvaId: string;
  rangeOfficer: boolean;
  organizationId: number;
  organization: OrganizationDto;
  eventShifts: EventShiftDto[];

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.birthdate = Date.now();
    this.vvaId = '';
    this.rangeOfficer = false;
    this.organizationId = 0;
    this.organization = new OrganizationDto();
    this.eventShifts = new Array<EventShiftDto>();
  }
}
