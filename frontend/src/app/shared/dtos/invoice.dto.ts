import {InvoiceItemDto} from "./invoice-item.dto";
import {InvoiceCreditorDto} from "./invoice-creditor.dto";
import {InvoiceDebtorDto} from "./invoice-debtor.dto";

export class InvoiceDto {
  id: number = 0;
  date: number = 0;
  title: string = "";
  filename: string = "";
  creditor: InvoiceCreditorDto = new InvoiceCreditorDto();
  debtor: InvoiceDebtorDto = new InvoiceDebtorDto();
  items: InvoiceItemDto[] = Array<InvoiceItemDto>();
}
