import { Component } from '@angular/core';
import { SidenavService } from '../shared/services/sidenav.service';

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
    this.sidenavService.addElement('Informationen', 'info', './info');
    this.sidenavService.addElement('Reservationen', 'donut_large', './reservations/list');
  }
}
