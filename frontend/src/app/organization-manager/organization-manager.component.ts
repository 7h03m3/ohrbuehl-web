import { Component } from '@angular/core';

@Component({
  selector: 'app-organization-manager',
  templateUrl: './organization-manager.component.html',
  styleUrls: ['./organization-manager.component.css'],
})
export class OrganizationManagerComponent {
  public subMenuMember = false;
  public subMenuShifts = false;
  public subMenuStatistic = false;

  public onMemberSubmenu() {
    this.resetSubmenus();
    this.subMenuMember = true;
  }

  public onShiftsSubmenu() {
    this.resetSubmenus();
    this.subMenuShifts = true;
  }

  public onStatisticSubmenu() {
    this.resetSubmenus();
    this.subMenuStatistic = true;
  }

  public resetSubmenus() {
    this.subMenuStatistic = false;
    this.subMenuShifts = false;
    this.subMenuMember = false;
  }
}
