export class InvoiceItemDto {
  id: number;
  position: number;
  amount: number;
  description: string;
  price: number;
  invoiceId: number;

  constructor() {
    this.id = 0;
    this.position = 0;
    this.amount = 0;
    this.description = '';
    this.price = 0;
    this.invoiceId = 0;
  }
}
