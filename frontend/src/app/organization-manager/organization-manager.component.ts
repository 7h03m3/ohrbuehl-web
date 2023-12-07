import { Component } from '@angular/core';
import { SidenavService } from '../shared/services/sidenav.service';
import { OrganizationFeatureApi } from '../api/organization-feature-api';
import { AuthService } from '../auth/auth.service';
import { OrganizationFeatureDto } from '../shared/dtos/organization-feature.dto';

@Component({
  selector: 'app-organization-manager',
  templateUrl: './organization-manager.component.html',
  styleUrls: ['./organization-manager.component.css'],
})
export class OrganizationManagerComponent {
  private organizationId = 0;

  public constructor(
    private sidenavService: SidenavService,
    private authService: AuthService,
    private featureApi: OrganizationFeatureApi,
  ) {}

  public ngOnInit() {
    if (!this.authService.isAdmin()) {
      this.organizationId = this.authService.getManagingOrganizationId();
      this.featureApi.getByOrganizationId(this.organizationId).subscribe((response) => {
        if (response == null) {
          response = new OrganizationFeatureDto();
        }
        this.setupSidenav(response);
      });
    } else {
      const features = new OrganizationFeatureDto();
      features.shiftPlanning = true;
      features.members = true;
      features.reservations = true;
      this.setupSidenav(features);
    }
  }

  public ngOnDestroy() {
    this.sidenavService.reset();
  }

  private setupSidenav(features: OrganizationFeatureDto) {
    this.sidenavService.addElement('Informationen', 'info', './info');

    if (features.reservations) {
      this.sidenavService.addElement('Reservationen', 'donut_large', './reservations/list');
    }

    if (features.members) {
      const memberMenu = this.sidenavService.addElement('Mitglieder', 'person', './member-list');
      this.sidenavService.addSubElement(memberMenu, 'Mitgliederliste', 'list', './member-list');
      this.sidenavService.addSubElement(memberMenu, 'VVA-Import', 'publish', './member-import');
    }

    if (features.shiftPlanning) {
      this.sidenavService.addElement('Helfer-Pool', 'groups', './event-staff-pool-edit');

      const shiftMenu = this.sidenavService.addElement('Schichtenplanung', 'schedule', './event-shift-list');
      this.sidenavService.addSubElement(shiftMenu, 'Schichten', 'schedule', './event-shift-list');
      this.sidenavService.addSubElement(shiftMenu, 'Downloads', 'download', './event-shift-downloads');

      const statisticMenu = this.sidenavService.addElement('Statistik', 'bar_chart', './event-staff-statistic');
      this.sidenavService.addSubElement(statisticMenu, 'Helferstatistik', 'bar_chart', './event-staff-statistic');
    }
  }
}
