import { ShootingRangeAccountingTypeEnum } from '../enums/shooting-range-accounting-type.enum';
import { ShootingRangeAccountingUnitDto } from './shooting-range-accounting-unit.dto';

export class ShootingRangeAccountingCreateDto {
  type: ShootingRangeAccountingTypeEnum;
  date: number;
  startTime: string;
  endTime: string;
  items: ShootingRangeAccountingUnitDto[];
  total: number;

  constructor() {
    this.type = ShootingRangeAccountingTypeEnum.Section_300m;
    this.date = 0;
    this.startTime = '';
    this.endTime = '';
    this.items = Array<ShootingRangeAccountingUnitDto>();
    this.total = 0;
  }
}
