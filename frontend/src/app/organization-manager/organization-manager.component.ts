import { Component } from '@angular/core';

@Component({
  selector: 'app-organization-manager',
  templateUrl: './organization-manager.component.html',
  styleUrls: ['./organization-manager.component.css'],
})
export class OrganizationManagerComponent {
  public subMenuStatistic = false;

  public onStatisticSubmenu() {
    this.subMenuStatistic = true;
  }

  public resetSubmenus() {
    this.subMenuStatistic = false;
  }
}
