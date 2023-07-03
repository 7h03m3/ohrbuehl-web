import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessHourReservationEntity } from './business-hour-reservation.entity';

@Entity('business-hours')
export class BusinessHourEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  start: number;

  @Column({ type: 'bigint' })
  end: number;

  @Column({ default: false })
  public: boolean;

  @Column({ default: false })
  enableReservation: boolean;

  @Column()
  comment: string;

  @OneToMany((type) => BusinessHourReservationEntity, (reservation) => reservation.businessHour)
  reservations: BusinessHourReservationEntity[];
}
