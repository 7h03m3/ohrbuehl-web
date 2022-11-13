import { Role } from '../enums/role.enum';
import { UserEntity } from '../../database/entities/user.entity';

export class UserDto {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  roles: Role;
  password: string;

  constructor() {
    this.id = 0;
    this.userName = '';
    this.firstName = '';
    this.lastName = '';
    this.roles = Role.Anonymous;
    this.password = '';
  }

  public fillFromEntity(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.userName = userEntity.userName;
    this.firstName = userEntity.firstName;
    this.lastName = userEntity.lastName;
    this.roles = Role[userEntity.roles];
    this.password = userEntity.password;
  }
}
