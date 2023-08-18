import { Component } from '@angular/core';
import { SidenavService } from '../shared/services/sidenav.service';

@Component({
  selector: 'app-organization-manager',
  templateUrl: './organization-manager.component.html',
  styleUrls: ['./organization-manager.component.css'],
})
export class OrganizationManagerComponent {
  public constructor(private sidenavService: SidenavService) {}

  public ngOnInit() {
    this.setupSidenav();
  }

  public ngOnDestroy() {
    this.sidenavService.reset();
  }

  private setupSidenav() {
    this.sidenavService.addElement('Informationen', 'info', './info');
    this.sidenavService.addElement('Reservationen', 'donut_large', './reservations/list');

    const memberMenu = this.sidenavService.addElement('Mitglieder', 'person', './member-list');
    this.sidenavService.addSubElement(memberMenu, 'Mitgliederliste', 'list', './member-list');
    this.sidenavService.addSubElement(memberMenu, 'VVA-Import', 'publish', './member-import');

    this.sidenavService.addElement('Helfer-Pool', 'groups', './event-staff-pool-edit');

    const shiftMenu = this.sidenavService.addElement('Schichtenplanung', 'schedule', './event-shift-list');
    this.sidenavService.addSubElement(shiftMenu, 'Schichten', 'schedule', './event-shift-list');
    this.sidenavService.addSubElement(shiftMenu, 'Downloads', 'download', './event-shift-downloads');

    const statisticMenu = this.sidenavService.addElement('Statistik', 'bar_chart', './event-staff-statistic');
    this.sidenavService.addSubElement(statisticMenu, 'Helferstatistik', 'bar_chart', './event-staff-statistic');
  }
}
