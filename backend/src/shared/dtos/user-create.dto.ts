import {Role} from "../enums/role.enum";

export class UserCreateDto {
  userName: string = "";
  firstName: string = "";
  lastName: string = "";
  roles: Role = Role.Anonymous;
  password: string = "";
}
