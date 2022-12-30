import { OrganizationCreateDto } from './organization-create.dto';

export class OrganizationDto extends OrganizationCreateDto {
  id: number;

  constructor() {
    super();
    this.id = 0;
  }
}
