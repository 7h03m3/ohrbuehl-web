import { Role } from '../enums/role.enum';

export class UserDto {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  roles: Role;

  public constructor() {
    this.id = 0;
    this.userName = '';
    this.firstName = '';
    this.lastName = '';
    this.roles = Role.Anonymous;
  }
}
