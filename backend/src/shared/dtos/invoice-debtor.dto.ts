export class InvoiceDebtorDto {
  name: string;
  address: string;
  buildingNumber: string;
  zip: number;
  city: string;

  constructor() {
    this.name = '';
    this.address = '';
    this.buildingNumber = '';
    this.zip = 0;
    this.city = '';
  }
}
