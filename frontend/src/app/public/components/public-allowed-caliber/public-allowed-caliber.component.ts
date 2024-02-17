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
  public listCaliber100m: string[] = [];
  public listCaliber300m: string[] = [];

  public constructor() {
    this.listCaliber25m.sort((a, b) => a.localeCompare(b));
    this.listCaliber100m.sort((a, b) => a.localeCompare(b));
    this.listCaliber300m.sort((a, b) => a.localeCompare(b));
  }
}
