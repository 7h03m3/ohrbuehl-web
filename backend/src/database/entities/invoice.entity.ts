import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InvoiceItemEntity } from './invoice-item.entity';

@Entity('invoice')
export class InvoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: number;

  @Column()
  title: string;

  @Column()
  filename: string;

  @Column('simple-json')
  creditor: {
    name: string;
    address: string;
    buildingNumber: string;
    zip: number;
    city: string;
    account: string;
  };

  @Column('simple-json')
  debtor: {
    name: string;
    address: string;
    buildingNumber: string;
    zip: number;
    city: string;
  };

  @OneToMany((type) => InvoiceItemEntity, (item) => item.id)
  items: InvoiceItemEntity[];
}
