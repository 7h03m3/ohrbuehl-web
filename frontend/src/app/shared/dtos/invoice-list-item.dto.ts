import { UserDto } from './user.dto';

export class InvoiceListItemDto {
  id: number;
  creator: UserDto;
  date: number;
  title: string;
  payed: boolean;

  constructor() {
    this.id = 0;
    this.creator = new UserDto();
    this.date = 0;
    this.title = '';
    this.payed = false;
  }
}
