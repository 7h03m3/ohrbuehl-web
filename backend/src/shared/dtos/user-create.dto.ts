import { Role } from '../enums/role.enum';
import { UserDto } from './user.dto';

export class UserCreateDto {
  userName: string;
  firstName: string;
  lastName: string;
  roles: Role;
  password: string;
  manager: UserDto;

  constructor() {
    this.userName = '';
    this.firstName = '';
    this.lastName = '';
    this.roles = Role.Anonymous;
    this.password = '';
    this.manager = new UserDto();
  }
}
