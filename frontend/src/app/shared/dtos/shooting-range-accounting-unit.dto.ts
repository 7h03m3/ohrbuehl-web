import { ShootingRangePriceDto } from './shooting-range-price.dto';
import { OrganizationDto } from './organization.dto';

export class ShootingRangeAccountingUnitDto {
  id: number;
  track: number;
  organization: OrganizationDto;
  price: ShootingRangePriceDto;
  amount: number;

  constructor() {
    this.id = 0;
    this.track = 0;
    this.organization = new OrganizationDto();
    this.price = new ShootingRangePriceDto();
    this.amount = 0;
  }
}
