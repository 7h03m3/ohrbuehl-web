import { OrganizationMemberCreateDto } from './organization-member-create.dto';

export class OrganizationMemberDto extends OrganizationMemberCreateDto {
  id: number;

  constructor() {
    super();
    this.id = 0;
  }
}
