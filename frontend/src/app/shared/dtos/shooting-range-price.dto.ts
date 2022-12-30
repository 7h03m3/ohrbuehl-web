import { ShootingRangePriceTypeEnum } from '../enums/shooting-range-price-type.enum';

export class ShootingRangePriceDto {
  id: number;
  type: ShootingRangePriceTypeEnum;
  name: string;
  description: string;
  price: number;

  public constructor() {
    this.id = 0;
    this.type = ShootingRangePriceTypeEnum.Section_300m;
    this.name = '';
    this.description = '';
    this.price = 0;
  }
}
