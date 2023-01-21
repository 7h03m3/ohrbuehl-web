import { OrganizationMemberDto } from './organization-member.dto';
import { UserDto } from './user.dto';
import { ShootingRangeAccountingUnitDto } from './shooting-range-accounting-unit.dto';
import { EventShiftDto } from './event-shift.dto';

export class OrganizationCreateDto {
  name: string;
  abbreviation: string;
  managerId: number;
  native: boolean;
  color: string;
  distance_300m: boolean;
  distance_100m: boolean;
  distance_50m: boolean;
  distance_25m: boolean;
  vvaId: string;

  managers: UserDto[];
  accountingUnits: ShootingRangeAccountingUnitDto[];
  shifts: EventShiftDto[];
  members: OrganizationMemberDto[];

  constructor() {
    this.name = '';
    this.abbreviation = '';
    this.managerId = 0;
    this.native = false;
    this.color = '';
    this.distance_300m = false;
    this.distance_100m = false;
    this.distance_50m = false;
    this.distance_25m = false;
    this.vvaId = '';

    this.managers = new Array<UserDto>();
    this.accountingUnits = new Array<ShootingRangeAccountingUnitDto>();
    this.shifts = new Array<EventShiftDto>();
    this.members = new Array<OrganizationMemberDto>();
  }
}
