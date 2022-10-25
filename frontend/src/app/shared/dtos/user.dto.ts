import {Role} from "../enums/role.enum";

export class UserDto {
  id: number = 0;
  userName: string = "";
  firstName: string = "";
  lastName: string = "";
  roles: Role = Role.Anonymous;
}
