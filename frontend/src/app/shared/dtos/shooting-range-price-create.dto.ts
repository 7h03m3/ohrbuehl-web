import { ShootingRangePriceTypeEnum } from '../enums/shooting-range-price-type.enum';

export class ShootingRangePriceCreateDto {
  type: ShootingRangePriceTypeEnum;
  name: string;
  description: string;
  price: number;

  public constructor() {
    this.type = ShootingRangePriceTypeEnum.Section_300m;
    this.name = '';
    this.description = '';
    this.price = 0;
  }
}
