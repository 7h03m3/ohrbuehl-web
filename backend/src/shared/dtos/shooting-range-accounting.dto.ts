import { ShootingRangeAccountingCreateDto } from './shooting-range-accounting-create.dto';

export class ShootingRangeAccountingDto extends ShootingRangeAccountingCreateDto {
  id: number;

  constructor() {
    super();
    this.id = 0;
  }
}
