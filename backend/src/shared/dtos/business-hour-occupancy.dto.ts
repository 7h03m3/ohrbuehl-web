export class BusinessHourOccupancyDto {
  current: number;
  max: number;

  constructor() {
    this.current = 0;
    this.max = 0;
  }
}
