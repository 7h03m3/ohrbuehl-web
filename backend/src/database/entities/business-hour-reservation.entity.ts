import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessHourEntity } from './business-hour.entity';
import { ReservationFacilityType } from '../../shared/enums/reservation-facility-type.enum';
import { ReservationEventType } from '../../shared/enums/reservation-event-type.enum';
import { UserEntity } from './user.entity';
import { OrganizationEntity } from './organization.entity';

@Entity('business-hours-reservations')
export class BusinessHourReservationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => UserEntity, (user) => user.reservations)
  @JoinColumn({ name: 'ownerId' })
  owner: UserEntity;

  @Column()
  ownerId: number;

  @ManyToOne((type) => OrganizationEntity, (organization) => organization.reservations, { nullable: true })
  @JoinColumn({ name: 'organizationId' })
  organization: OrganizationEntity;

  @Column({ nullable: true })
  organizationId: number;

  @ManyToOne((type) => BusinessHourEntity, (businessHour) => businessHour.reservations)
  @JoinColumn({ name: 'businessHourId' })
  businessHour: BusinessHourEntity;

  @Column()
  businessHourId: number;

  @Column({ type: 'enum', enum: ReservationFacilityType, default: ReservationFacilityType.Distance300m })
  facilityType: ReservationFacilityType;

  @Column({ type: 'enum', enum: ReservationEventType, default: ReservationEventType.Other })
  eventType: ReservationEventType;

  @Column()
  comment: string;

  @Column({ default: false })
  locked: boolean;
}
