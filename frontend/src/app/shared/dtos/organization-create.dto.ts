import { UserDto } from './user.dto';

export class OrganizationCreateDto {
  name: string;
  abbreviation: string;
  managerId: number;
  native: boolean;
  color: string;
  distance_300m: boolean;
  distance_100m: boolean;
  distance_50m: boolean;
  distance_25m: boolean;
  manager: UserDto;

  constructor() {
    this.name = '';
    this.abbreviation = '';
    this.managerId = 0;
    this.native = false;
    this.color = '';
    this.distance_300m = false;
    this.distance_100m = false;
    this.distance_50m = false;
    this.distance_25m = false;
    this.manager = new UserDto();
  }
}
