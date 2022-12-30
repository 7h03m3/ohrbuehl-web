import { ShootingRangePriceTypeEnum } from '../enums/shooting-range-price-type.enum';

export class ShootingRangePriceCreateDto {
  name: string;
  type: ShootingRangePriceTypeEnum;
  description: string;
  price: number;

  constructor() {
    this.name = '';
    this.type = ShootingRangePriceTypeEnum.Section_300m;
    this.description = '';
    this.price = 0;
  }
}
