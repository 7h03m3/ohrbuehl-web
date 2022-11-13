import { InvoiceItemDto } from './invoice-item.dto';
import { InvoiceCreditorDto } from './invoice-creditor.dto';
import { InvoiceDebtorDto } from './invoice-debtor.dto';
import { UserDto } from './user.dto';

export class InvoiceDto {
  id: number;
  creator: UserDto;
  date: number;
  title: string;
  filename: string;
  creditor: InvoiceCreditorDto;
  debtor: InvoiceDebtorDto | undefined;
  items: InvoiceItemDto[];
  payed: boolean;

  constructor() {
    this.id = 0;
    this.creator = new UserDto();
    this.date = 0;
    this.title = '';
    this.filename = '';
    this.creditor = new InvoiceCreditorDto();
    this.debtor = undefined;
    this.items = Array<InvoiceItemDto>();
    this.payed = false;
  }
}
