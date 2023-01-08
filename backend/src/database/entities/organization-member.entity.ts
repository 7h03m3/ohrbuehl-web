import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { OrganizationMemberDto } from '../../shared/dtos/organization-member.dto';
import { OrganizationMemberCreateDto } from '../../shared/dtos/organization-member-create.dto';
import { EventShiftEntity } from './event-shift.entity';
import { EventStaffPoolEntity } from './event-staff-pool.entity';

@Entity('organization-member')
export class OrganizationMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'bigint' })
  birthdate: number;

  @Column()
  vvaId: string;

  @ManyToOne((type) => OrganizationEntity, (organization) => organization.members)
  @JoinColumn({ name: 'organizationId' })
  organization: OrganizationEntity;

  @Column()
  organizationId: number;

  @OneToMany((type) => EventShiftEntity, (shift) => shift.assignedStaff)
  eventShifts: EventShiftEntity[];

  @OneToMany((type) => EventStaffPoolEntity, (pool) => pool.event)
  staffPool: EventStaffPoolEntity[];

  public loadFromDto(dto: OrganizationMemberDto) {
    this.loadFromCreateDto(dto);
    this.id = dto.id;
  }

  public loadFromCreateDto(dto: OrganizationMemberCreateDto) {
    this.firstName = dto.firstName;
    this.lastName = dto.lastName;
    this.birthdate = dto.birthdate;
    this.vvaId = dto.vvaId;
    this.organizationId = dto.organizationId;
  }
}
