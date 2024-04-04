import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth/auth.service';

import { Router } from '@angular/router';
import { UserLocalData } from './shared/classes/user-local-data';
import { ContactMessageService } from './shared/services/contact-message.service';
import { appMainMenuEntries } from './app-main-menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AppSubmenuEntry } from './app-menu-entry';
import { appSingleShooterMenuEntries } from './single-shooter/single-shooter-menu';
import { appOrganizationManagerMenuEntries } from './organization-manager/organization-manager-menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public isMobileView = false;
  public currentYear = new Date().getFullYear().toString();
  @ViewChild('drawer') drawer: any;
  protected readonly appMenuEntries = appMainMenuEntries;
  protected readonly appSingleShooterMenuEntries = appSingleShooterMenuEntries;
  protected readonly appOrganizationManagerMenuEntries = appOrganizationManagerMenuEntries;

  constructor(
    public authService: AuthService,
    private router: Router,
    public contactMessageService: ContactMessageService,
    private responsive: BreakpointObserver,
  ) {}

  public ngOnInit() {
    this.responsive.observe(Breakpoints.Handset).subscribe((result) => {
      this.isMobileView = result.matches;
    });

    this.contactMessageService.update();
  }

  public getRoleText(): string {
    return UserLocalData.convertRoleText(this.authService.getRole());
  }

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/user/login');
  }

  public onSidenav(entry: AppSubmenuEntry) {
    if (entry.routerLink == '') {
      return;
    }
    this.router.navigateByUrl(entry.routerLink).then(() => {
      this.drawer.close();
      this.appMenuEntries.forEach((entry) => {
        entry.expanded = false;
      });
    });
  }
}
