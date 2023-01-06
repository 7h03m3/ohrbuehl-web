import { Role } from '../enums/role.enum';

export class UserEditDto {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  roles: Role;
  password: string;

  public constructor() {
    this.id = 0;
    this.userName = '';
    this.firstName = '';
    this.lastName = '';
    this.roles = Role.Anonymous;
    this.password = '';
  }
}
