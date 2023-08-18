import { Component } from '@angular/core';
import { SidenavService } from '../shared/services/sidenav.service';

@Component({
  selector: 'app-shooting-range',
  templateUrl: './shooting-range.component.html',
  styleUrls: ['./shooting-range.component.css'],
})
export class ShootingRangeComponent {
  public constructor(private sidenavService: SidenavService) {}

  public ngOnInit() {
    this.setupSidenav();
  }

  public ngOnDestroy() {
    this.sidenavService.reset();
  }

  private setupSidenav() {
    this.sidenavService.addElement('Reservationen', 'donut_large', './reservations');
    this.sidenavService.addElement('Öffnungszeiten', 'schedule', './reservations/list');
    this.sidenavService.addElement('Tagesabrechnung', 'account_balance', './daily-accounting');
    this.sidenavService.addElement('Schusszahlen', 'list_alt', './accounting-list');
    this.sidenavService.addElement('Rechnungen', 'list', './invoice-list');
    this.sidenavService.addElement('Rechnung erstellen', 'money', './invoice-edit');
  }
}
