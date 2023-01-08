import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrganizationMemberEntity } from './organization-member.entity';
import { EventEntity } from './event.entity';

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
}
