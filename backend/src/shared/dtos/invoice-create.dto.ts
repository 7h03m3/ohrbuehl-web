import { InvoiceItemDto } from './invoice-item.dto';
import { InvoiceCreditorDto } from './invoice-creditor.dto';
import { InvoiceDebtorDto } from './invoice-debtor.dto';

export class InvoiceCreateDto {
  id: number;
  date: number;
  title: string;
  filename: string;
  creditor: InvoiceCreditorDto;
  debtor: InvoiceDebtorDto;
  items: InvoiceItemDto[];
  payed: boolean;

  constructor() {
    this.id = 0;
    this.date = 0;
    this.title = '';
    this.filename = '';
    this.creditor = new InvoiceCreditorDto();
    this.debtor = new InvoiceDebtorDto();
    this.items = Array<InvoiceItemDto>();
    this.payed = false;
  }
}
