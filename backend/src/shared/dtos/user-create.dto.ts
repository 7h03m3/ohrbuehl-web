import { Role } from '../enums/role.enum';

export class UserCreateDto {
  userName: string;
  firstName: string;
  lastName: string;
  roles: Role;
  password: string;

  constructor() {
    this.userName = '';
    this.firstName = '';
    this.lastName = '';
    this.roles = Role.Anonymous;
    this.password = '';
  }
}
