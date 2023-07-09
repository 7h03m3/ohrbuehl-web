import { Column } from 'typeorm';

export class BusinessHourOccupancyEntity {
  @Column()
  current: number;

  @Column()
  max: number;

  constructor() {
    this.current = 0;
    this.max = 0;
  }
}
