import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventShiftCategoryEntity } from './event-shift-category.entity';
import { EventShiftDto } from '../../shared/dtos/event-shift.dto';
import { EventShiftCreateDto } from '../../shared/dtos/event-shift-create.dto';
import { EventEntity } from './event.entity';
import { OrganizationEntity } from './organization.entity';
import { OrganizationMemberEntity } from './organization-member.entity';

@Entity('event-shifts')
export class EventShiftEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  start: number;

  @Column({ type: 'bigint' })
  end: number;

  @ManyToOne((type) => EventShiftCategoryEntity, (category) => category.shifts)
  @JoinColumn({ name: 'categoryId' })
  category: EventShiftCategoryEntity;

  @Column()
  categoryId: number;

  @ManyToOne((type) => EventEntity, (event) => event.shifts)
  @JoinColumn({ name: 'eventId' })
  event: EventEntity;

  @Column()
  eventId: number;

  @ManyToOne((type) => OrganizationEntity, (organization) => organization.shifts, { nullable: true })
  @JoinColumn({ name: 'organizationId' })
  organization: OrganizationEntity;

  @Column({ nullable: true })
  organizationId: number;

  @ManyToOne((type) => OrganizationMemberEntity, (staff) => staff.eventShifts, { nullable: true })
  @JoinColumn({ name: 'assignedStaffId' })
  assignedStaff: OrganizationMemberEntity;

  @Column({ nullable: true })
  assignedStaffId: number;

  public loadFromDto(dto: EventShiftDto) {
    this.loadFromCreateDto(dto);
    this.id = dto.id;
  }

  public loadFromCreateDto(dto: EventShiftCreateDto) {
    this.start = dto.start;
    this.end = dto.end;
  }
}
