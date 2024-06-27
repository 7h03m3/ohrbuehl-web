import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InvoiceEntity } from './invoice.entity';
import { OrganizationEntity } from './organization.entity';
import { BusinessHourReservationEntity } from './business-hour-reservation.entity';
import { UserCreateDto } from '../../shared/dtos/user-create.dto';

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

  @Column({ default: '' })
  street: string;

  @Column({ default: 0 })
  zip: number;

  @Column({ default: '' })
  location: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  mobile: string;

  @Column()
  roles: string;

  @Column({ default: false })
  disabled: boolean;

  @OneToMany((type) => InvoiceEntity, (invoice) => invoice.creator)
  invoices: InvoiceEntity[];

  @ManyToOne((type) => OrganizationEntity, (organization) => organization.managers, { nullable: true })
  @JoinColumn({ name: 'assignedOrganizationId' })
  assignedOrganization: OrganizationEntity;

  @Column({ nullable: true })
  assignedOrganizationId: number;

  @OneToMany((type) => BusinessHourReservationEntity, (reservation) => reservation.owner)
  reservations: BusinessHourReservationEntity[];

  public loadDto(data: UserCreateDto) {
    this.userName = data.userName;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.password = data.password;
    this.street = data.street;
    this.zip = data.zip;
    this.location = data.location;
    this.email = data.email;
    this.mobile = data.mobile;
    this.roles = data.roles;
  }
}
