import { Component } from '@angular/core';

@Component({
  selector: 'app-public-allowed-caliber',
  templateUrl: './public-allowed-caliber.component.html',
  styleUrls: ['./public-allowed-caliber.component.css'],
})
export class PublicAllowedCaliberComponent {
  public listCaliber25m: string[] = [
    '.22 Long Rifle',
    '.22 Magnum',
    '6.35 Browning',
    '7.65 Browning',
    '.38 Spezial',
    '9mm Kurz',
    '9mm Makarov',
    '9mm Para',
    '7.65mm Para',
    '7.62mm Tokarev',
    '.45 ACP',
    '.45 Long Colt',
  ];
  public listCaliber100m: string[] = [
    '.22 Magnum',
    '.17 HMR',
    '.243 Winchester',
    '.223 Remington',
    '.303 British',
    '7,5x55 (GP 11)',
    '.308 Winchester',
    '.30.06 Springfield',
    '8x57 IS',
    '7,62x39',
  ];
  public listCaliber300m: string[] = [
    '.223 Remington (GP 90)',
    '7,5x55 Swiss (GP 11)',
    '.308 Winchester',
    '.303 British',
    '.30-06 Springfield',
    '8x57 IS',
    '7,62x39',
    '7,62x54R',
    '5,45x39,5',
    '.243 Winchester',
    '6x47',
    '6mmBR',
    '6,5x55',
    '6,5mm Creedmore',
  ];

  public constructor() {
    this.listCaliber25m.sort((a, b) => a.localeCompare(b));
    this.listCaliber100m.sort((a, b) => a.localeCompare(b));
    this.listCaliber300m.sort((a, b) => a.localeCompare(b));
  }
}
