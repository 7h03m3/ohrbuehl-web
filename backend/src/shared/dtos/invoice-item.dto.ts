export class InvoiceItemDto {
  position: number;
  amount: number;
  description: string;
  price: number;

  constructor() {
    this.position = 0;
    this.amount = 0;
    this.description = '';
    this.price = 0;
  }
}
