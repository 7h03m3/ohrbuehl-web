export class InvoiceItemDto {
  position: number = 0;
  amount: number = 0;
  description: string = '';
  price: number = 0;

  constructor() {
    this.position = 0;
    this.amount = 0;
    this.description = '';
    this.price = 0;
  }
}
