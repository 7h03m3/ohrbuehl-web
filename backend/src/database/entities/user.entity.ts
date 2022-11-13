import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InvoiceEntity } from './invoice.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  roles: string;

  @OneToMany((type) => InvoiceEntity, (invoice) => invoice.creator)
  invoices: InvoiceEntity[];
}
