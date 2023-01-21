import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InvoiceItemEntity } from './invoice-item.entity';
import { InvoiceCreditorEntity } from './invoice-creditor.entity';
import { InvoiceDebtorEntity } from './invoice-debtor.entity';
import { UserEntity } from './user.entity';
import { InvoiceDto } from '../../shared/dtos/invoice.dto';

@Entity('invoice')
export class InvoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => UserEntity, (user) => user.invoices)
  @JoinColumn({ name: 'creatorId' })
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

  public fillFromDto(invoiceDto: InvoiceDto) {
    this.id = invoiceDto.id;
    this.date = invoiceDto.date;
    this.title = invoiceDto.title;
    this.filename = invoiceDto.filename;
    this.creditor = invoiceDto.creditor;
    this.debtor = invoiceDto.debtor;
    this.payed = invoiceDto.payed;
  }
}
