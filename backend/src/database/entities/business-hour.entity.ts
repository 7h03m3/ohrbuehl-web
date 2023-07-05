import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessHourReservationEntity } from './business-hour-reservation.entity';
import { BusinessHourOccupancyEntity } from './business-hour-occupancy.entity';
import { BusinessHoursCreateDto } from '../../shared/dtos/business-hours-create.dto';

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

  @Column(() => BusinessHourOccupancyEntity)
  distance25mBlockManualOccupancy: BusinessHourOccupancyEntity;

  @Column(() => BusinessHourOccupancyEntity)
  distance25mBlockElectronicOccupancy: BusinessHourOccupancyEntity;

  @Column(() => BusinessHourOccupancyEntity)
  distance50mManualOccupancy: BusinessHourOccupancyEntity;

  @Column(() => BusinessHourOccupancyEntity)
  distance50mElectronicOccupancy: BusinessHourOccupancyEntity;

  @Column(() => BusinessHourOccupancyEntity)
  distance100mOccupancy: BusinessHourOccupancyEntity;

  @Column(() => BusinessHourOccupancyEntity)
  distance300mOccupancy: BusinessHourOccupancyEntity;

  @OneToMany((type) => BusinessHourReservationEntity, (reservation) => reservation.businessHour)
  reservations: BusinessHourReservationEntity[];

  public fillFromDto(dto: BusinessHoursCreateDto) {
    this.id = dto.id;
    this.start = dto.start;
    this.end = dto.end;
    this.public = dto.public;
    this.enableReservation = dto.enableReservation;
    this.comment = dto.comment;
  }
}
