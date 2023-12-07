import { OrganizationDto } from './organization.dto';

export class OrganizationFeatureDto {
  id = 0;
  organization: OrganizationDto = new OrganizationDto();
  organizationId = 0;
  reservations = false;
  members = false;
  shiftPlanning = false;
}
