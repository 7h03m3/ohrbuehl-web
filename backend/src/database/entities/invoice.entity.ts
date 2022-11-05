import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InvoiceItemEntity } from './invoice-item.entity';
import { InvoiceCreditorEntity } from './invoice-creditor.entity';
import { InvoiceDebtorEntity } from './invoice-debtor.entity';
import { UserEntity } from './user.entity';

@Entity('invoice')
export class InvoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  creator: UserEntity;

  @Column({ type: 'bigint' })
  date: number;

  @Column()
  title: string;

  @Column()
  filename: string;

  @Column(() => InvoiceCreditorEntity)
  creditor: InvoiceCreditorEntity;

  @Column(() => InvoiceDebtorEntity)
  debtor: InvoiceDebtorEntity;

  @OneToMany((type) => InvoiceItemEntity, (item) => item.invoice)
  items: InvoiceItemEntity[];

  @Column({ default: false })
  payed: boolean;
}
