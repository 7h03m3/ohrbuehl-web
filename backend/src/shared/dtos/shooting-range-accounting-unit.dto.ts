import { ShootingRangeAccountingUnitCreateDto } from './shooting-range-accounting-unit-create.dto';

export class ShootingRangeAccountingUnitDto extends ShootingRangeAccountingUnitCreateDto {
  id: number;

  constructor() {
    super();
    this.id = 0;
  }
}
