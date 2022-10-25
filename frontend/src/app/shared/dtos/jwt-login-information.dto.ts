import {Role} from "../enums/role.enum";


export class JwtLoginInformation {
  userName: string = "";
  id: number = 0;
  roles: Role = Role.Anonymous;
  access_token: string = "";
}
