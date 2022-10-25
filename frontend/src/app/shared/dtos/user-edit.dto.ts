import {Role} from "../enums/role.enum";

export class UserEditDto {
  id: number = 0;
  userName: string = "";
  firstName: string = "";
  lastName: string = "";
  roles: Role = Role.Anonymous;
  password: string = "";
}
