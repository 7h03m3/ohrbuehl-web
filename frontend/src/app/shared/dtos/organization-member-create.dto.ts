import { OrganizationDto } from './organization.dto';

export class OrganizationMemberCreateDto {
  firstName: string;
  lastName: string;
  birthdate: number;
  vvaId: string;
  rangeOfficer: boolean;
  organizationId: number;
  organization: OrganizationDto;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.birthdate = Date.now();
    this.vvaId = '';
    this.rangeOfficer = false;
    this.organizationId = 0;
    this.organization = new OrganizationDto();
  }
}
