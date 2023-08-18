import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../shared/services/sidenav.service';

@Component({
  selector: 'app-components',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(private sidenavService: SidenavService) {}

  public ngOnInit() {
    this.setupSidenav();
  }

  public ngOnDestroy() {
    this.sidenavService.reset();
  }

  private setupSidenav() {
    this.sidenavService.addElement('Benutzer', 'person', './user-list');
    this.sidenavService.addElement('Benachrichtigungen', 'notifications', './notifier-list');
    this.sidenavService.addElement('Organisationen', 'corporate_fare', './organization-list');
    this.sidenavService.addElement('Preise', 'money', './price-list');
    this.sidenavService.addElement('Anlasskategorie', 'festival', './event-category-list');
    this.sidenavService.addElement('Schichtenkategorie', 'category', './event-shift-category-list');
  }
}
