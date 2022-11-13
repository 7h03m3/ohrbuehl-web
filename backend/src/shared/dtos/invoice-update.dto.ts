import { InvoiceCreditorDto } from './invoice-creditor.dto';
import { InvoiceDebtorDto } from './invoice-debtor.dto';
import { InvoiceDto } from './invoice.dto';

export class InvoiceUpdateDto {
  id: number;
  date: number;
  title: string;
  filename: string;
  creditor: InvoiceCreditorDto;
  debtor: InvoiceDebtorDto;
  payed: boolean;

  constructor() {
    this.id = 0;
    this.date = 0;
    this.title = '';
    this.filename = '';
    this.creditor = new InvoiceCreditorDto();
    this.debtor = new InvoiceDebtorDto();
    this.payed = false;
  }

  public fillFromDto(invoiceDto: InvoiceDto) {
    this.id = invoiceDto.id;
    this.date = invoiceDto.date;
    this.title = invoiceDto.title;
    this.filename = invoiceDto.filename;
    this.creditor = invoiceDto.creditor;
    this.debtor = invoiceDto.debtor;
    this.payed = invoiceDto.payed;
  }
}
