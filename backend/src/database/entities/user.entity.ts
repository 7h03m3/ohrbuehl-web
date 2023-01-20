import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InvoiceEntity } from './invoice.entity';
import { OrganizationEntity } from './organization.entity';
import { UserCreateDto } from '../../shared/dtos/user-create.dto';
import { UserDto } from '../../shared/dtos/user.dto';
import { Role } from '../../shared/enums/role.enum';

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

  @ManyToOne((type) => OrganizationEntity, (organization) => organization.managers, { nullable: true })
  @JoinColumn({ name: 'assignedOrganizationId' })
  assignedOrganization: OrganizationEntity;

  @Column({ nullable: true })
  assignedOrganizationId: number;

  public loadFromDto(dto: UserCreateDto) {
    this.userName = dto.userName;
    this.firstName = dto.firstName;
    this.lastName = dto.lastName;
    this.password = dto.password;
    this.roles = dto.roles;
  }

  public getDto(): UserDto {
    const dto = new UserDto();
    dto.userName = this.userName;
    dto.firstName = this.firstName;
    dto.lastName = this.lastName;
    dto.password = this.password;
    dto.roles = Role[this.roles];

    return dto;
  }
}
