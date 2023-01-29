import { ShootingRangePriceDto } from './shooting-range-price.dto';
import { OrganizationDto } from './organization.dto';

export class ShootingRangeAccountingUnitCreateDto {
  track: number;
  organization: OrganizationDto;
  price: ShootingRangePriceDto;
  amount: number;
  comment: string;

  constructor() {
    this.track = 0;
    this.organization = new OrganizationDto();
    this.price = null;
    this.amount = 0;
    this.comment = '';
  }
}
