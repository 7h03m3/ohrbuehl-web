import { Column } from 'typeorm';

export class BusinessHourOccupancyEntity {
  @Column()
  current: number;

  @Column()
  max: number;
}
