import { Role } from '../enums/role.enum';

export class JwtLoginInformation {
  userName: string;
  id: number;
  roles: Role;
  access_token: string;
  assignedOrganizationId: number;

  constructor() {
    this.userName = '';
    this.id = 0;
    this.roles = Role.Anonymous;
    this.access_token = '';
    this.assignedOrganizationId = 0;
  }
}
