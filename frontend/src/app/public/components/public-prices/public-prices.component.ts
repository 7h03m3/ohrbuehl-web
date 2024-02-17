import { Component } from '@angular/core';

export interface PriceEntry {
  price: number;
  priceUnit: string;
  description: string;
}

@Component({
  selector: 'app-public-prices',
  templateUrl: './public-prices.component.html',
  styleUrls: ['./public-prices.component.css'],
})
export class PublicPricesComponent {
  public prices300m = new Array<PriceEntry>();
  public pricesOthers = new Array<PriceEntry>();
  public displayedColumns: string[] = ['price', 'description'];

  constructor() {
    this.addPrice300m(0.25, 'Einzelschützen');
    this.addPrice300m(
      0.32,
      'Anlässe der schweizerischen und kantonalen Matchvereinigung sowie Kantonal und Bezirksschützenverbände.',
    );
    this.addPrice300m(0.33, 'Sämtliche andere Schiessanlässe, wie Firmen und Bankenschiessen.');

    this.addPrice(40.0, 'Scheiben 100m');
    this.addPrice(25.0, 'Scheiben 50m (elektronisch & Zugscheiben)');
    this.addPrice(45.0, 'Scheibenblock 25m (elektronisch & konventionell)');
  }

  private static getPrice(price: number, priceUnit: string, description: string): PriceEntry {
    return { price: price, priceUnit: priceUnit, description: description };
  }

  private addPrice300m(price: number, description: string) {
    this.prices300m.push(PublicPricesComponent.getPrice(price, 'SFr./Schuss', description));
  }

  private addPrice(price: number, description: string) {
    this.pricesOthers.push(PublicPricesComponent.getPrice(price, 'SFr./h', description));
  }
}
