import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrganizationMemberEntity } from './organization-member.entity';
import { EventEntity } from './event.entity';
import { EventStaffPoolDto } from '../../shared/dtos/event-staff-pool.dto';

@Entity('event-staff-pool')
export class EventStaffPoolEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => EventEntity, (event) => event.staffPool)
  @JoinColumn({ name: 'eventId' })
  event: EventEntity;

  @Column()
  eventId: number;

  @ManyToOne((type) => OrganizationMemberEntity, (member) => member.staffPool)
  @JoinColumn({ name: 'memberId' })
  member: OrganizationMemberEntity;

  @Column()
  memberId: number;

  @Column()
  organizationId: number;

  public loadFromDto(dto: EventStaffPoolDto) {
    this.id = dto.id;
    this.eventId = dto.eventId;
    this.memberId = dto.memberId;
    this.organizationId = dto.organizationId;
  }
}
