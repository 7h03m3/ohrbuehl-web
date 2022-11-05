import { Column } from 'typeorm';

export class InvoiceCreditorEntity {
  @Column()
  name: string;

  @Column()
  addressAddition: string;

  @Column()
  address: string;

  @Column()
  buildingNumber: string;

  @Column()
  zip: number;

  @Column()
  city: string;

  @Column()
  account: string;
}
