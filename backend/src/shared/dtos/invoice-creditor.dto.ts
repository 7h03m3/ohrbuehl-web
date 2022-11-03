export class InvoiceCreditorDto {
  name: string;
  address: string;
  buildingNumber: string;
  zip: number;
  city: string;
  account: string;

  constructor() {
    this.name = '';
    this.address = '';
    this.buildingNumber = '';
    this.zip = 0;
    this.city = '';
    this.account = '';
  }
}
