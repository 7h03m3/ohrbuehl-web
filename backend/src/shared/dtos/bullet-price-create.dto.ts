export class BulletPriceCreateDto {
  name: string;
  description: string;
  price: number;

  constructor() {
    this.name = '';
    this.description = '';
    this.price = 0;
  }
}
