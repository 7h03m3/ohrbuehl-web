import { ShootingRangeAccountingTypeEnum } from '../enums/shooting-range-accounting-type.enum';
import { ShootingRangeAccountingUnitDto } from './shooting-range-accounting-unit.dto';

export class ShootingRangeAccountingDto {
  id: number;
  type: ShootingRangeAccountingTypeEnum;
  start: number;
  end: number;
  items: ShootingRangeAccountingUnitDto[];
  total: number;

  constructor() {
    this.id = 0;
    this.type = ShootingRangeAccountingTypeEnum.Section_300m;
    this.start = 0;
    this.end = 0;
    this.items = Array<ShootingRangeAccountingUnitDto>();
    this.total = 0;
  }
}
