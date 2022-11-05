import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InvoiceEntity } from './invoice.entity';

@Entity('invoice-item')
export class InvoiceItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: number;

  @Column()
  amount: number;

  @Column()
  description: string;

  @Column({ type: 'float' })
  price: number;

  @ManyToOne((type) => InvoiceEntity, (invoice) => invoice.items)
  @JoinColumn({ name: 'invoiceId' })
  invoice: InvoiceEntity;
}
