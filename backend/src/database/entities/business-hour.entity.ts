import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessHourReservationEntity } from './business-hour-reservation.entity';
import { BusinessHourOccupancyEntity } from './business-hour-occupancy.entity';
import { BusinessHoursCreateDto } from '../../shared/dtos/business-hours-create.dto';
import { BusinessHoursDto } from '../../shared/dtos/business-hours.dto';

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

  constructor() {
    this.distance25mBlockManualOccupancy = new BusinessHourOccupancyEntity();
    this.distance25mBlockElectronicOccupancy = new BusinessHourOccupancyEntity();
    this.distance50mManualOccupancy = new BusinessHourOccupancyEntity();
    this.distance50mElectronicOccupancy = new BusinessHourOccupancyEntity();
    this.distance100mOccupancy = new BusinessHourOccupancyEntity();
    this.distance300mOccupancy = new BusinessHourOccupancyEntity();
  }

  public fillFromDto(dto: BusinessHoursCreateDto) {
    this.id = dto.id;
    this.start = dto.start;
    this.end = dto.end;
    this.public = dto.public;
    this.enableReservation = dto.enableReservation;
    this.comment = dto.comment;
  }

  public fillMaxOccupancyFromDto(dto: BusinessHoursDto) {
    this.distance25mBlockElectronicOccupancy.max = dto.distance25mBlockElectronicOccupancy.max;
    this.distance25mBlockManualOccupancy.max = dto.distance25mBlockManualOccupancy.max;
    this.distance50mElectronicOccupancy.max = dto.distance50mElectronicOccupancy.max;
    this.distance50mManualOccupancy.max = dto.distance50mManualOccupancy.max;
    this.distance100mOccupancy.max = dto.distance100mOccupancy.max;
    this.distance300mOccupancy.max = dto.distance300mOccupancy.max;
  }
}
