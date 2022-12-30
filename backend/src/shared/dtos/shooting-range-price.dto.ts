import { ShootingRangePriceTypeEnum } from '../enums/shooting-range-price-type.enum';

export class ShootingRangePriceDto {
  id: number;
  name: string;
  type: ShootingRangePriceTypeEnum;
  description: string;
  price: number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.type = ShootingRangePriceTypeEnum.Section_300m;
    this.description = '';
    this.price = 0;
  }
}
