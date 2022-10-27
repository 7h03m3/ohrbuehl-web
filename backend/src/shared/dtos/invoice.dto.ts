import { InvoiceItemDto } from "./invoice-item.dto";
import { InvoiceCreditorDto } from "./invoice-creditor.dto";
import { InvoiceDebtorDto } from "./invoice-debtor.dto";

export class InvoiceDto {
  date: number = 0;
  title: string = "";
  filename: string = "";
  creditor: InvoiceCreditorDto = new InvoiceCreditorDto();
  debtor: InvoiceDebtorDto | undefined;
  items: InvoiceItemDto[] = Array<InvoiceItemDto>();
}