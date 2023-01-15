import { OrganizationDto } from './organization.dto';
import { EventShiftDto } from './event-shift.dto';
import { EventStaffPoolDto } from './event-staff-pool.dto';

export class OrganizationMemberCreateDto {
  firstName: string;
  lastName: string;
  birthdate: number;
  phoneNumber: string;
  emailAddress: string;
  vvaId: string;
  rangeOfficer: boolean;
  organizationId: number;
  organization: OrganizationDto;
  eventShifts: EventShiftDto[];
  staffPool: EventStaffPoolDto[];

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.birthdate = Date.now();
    this.phoneNumber = '';
    this.emailAddress = '';
    this.vvaId = '';
    this.rangeOfficer = false;
    this.organizationId = 0;
    this.organization = new OrganizationDto();
    this.eventShifts = new Array<EventShiftDto>();
    this.staffPool = new Array<EventStaffPoolDto>();
  }
}
