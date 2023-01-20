import { UserCreateDto } from './user-create.dto';

export class UserDto extends UserCreateDto {
  id: number;

  constructor() {
    super();
    this.id = 0;
  }
}
