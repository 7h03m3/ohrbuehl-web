import { InvoiceItemDto } from './invoice-item.dto';
import { InvoiceCreditorDto } from './invoice-creditor.dto';
import { InvoiceDebtorDto } from './invoice-debtor.dto';

export class InvoiceDto {
  id: number;
  date: number;
  title: string;
  filename: string;
  creditor: InvoiceCreditorDto;
  debtor: InvoiceDebtorDto | undefined;
  items: InvoiceItemDto[];

  constructor() {
    this.id = 0;
    this.date = 0;
    this.title = '';
    this.filename = '';
    this.creditor = new InvoiceCreditorDto();
    this.debtor = undefined;
    this.items = Array<InvoiceItemDto>();
  }
}
