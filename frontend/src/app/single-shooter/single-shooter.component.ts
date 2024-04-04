import { Component } from '@angular/core';
import { SidenavService } from '../shared/services/sidenav.service';
import { appSingleShooterMenuEntries } from './single-shooter-menu';

@Component({
  selector: 'app-single-shooter',
  templateUrl: './single-shooter.component.html',
  styleUrls: ['./single-shooter.component.css'],
})
export class SingleShooterComponent {
  public constructor(private sidenavService: SidenavService) {}

  public ngOnInit() {
    this.setupSidenav();
  }

  public ngOnDestroy() {
    this.sidenavService.reset();
  }

  private setupSidenav() {
    appSingleShooterMenuEntries[0].subs.forEach((entry) => {
      this.sidenavService.addElement(entry.name, entry.icon, entry.routerLink);
    });
  }
}
