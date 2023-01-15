import { Component } from '@angular/core';

@Component({
  selector: 'app-organization-manager',
  templateUrl: './organization-manager.component.html',
  styleUrls: ['./organization-manager.component.css'],
})
export class OrganizationManagerComponent {
  public subMenuMember = false;
  public subMenuStatistic = false;

  public onStatisticSubmenu() {
    this.resetSubmenus();
    this.subMenuStatistic = true;
  }

  public onMemberSubmenu() {
    this.resetSubmenus();
    this.subMenuMember = true;
  }

  public resetSubmenus() {
    this.subMenuStatistic = false;
    this.subMenuMember = false;
  }
}
