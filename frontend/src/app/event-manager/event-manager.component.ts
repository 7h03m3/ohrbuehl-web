import { Component } from '@angular/core';
import { SidenavService } from '../shared/services/sidenav.service';

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.css'],
})
export class EventManagerComponent {
  public constructor(private sidenavService: SidenavService) {}

  public ngOnInit() {
    this.setupSidenav();
  }

  public ngOnDestroy() {
    this.sidenavService.reset();
  }

  private setupSidenav() {
    this.sidenavService.addElement('Anlässe', 'event', './event-list');
    this.sidenavService.addElement('Schichtenplanung', 'schedule', './event-shift-list');
    const element = this.sidenavService.addElement('Statistik', 'bar_chart', './statistic-event-shift');
    this.sidenavService.addSubElement(element, 'Schichtenstatistik', 'bar_chart', './statistic-event-shift');
  }
}
