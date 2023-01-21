import { Component } from '@angular/core';

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.css'],
})
export class EventManagerComponent {
  public subMenuStatistic = false;

  public onStatisticSubmenu() {
    this.subMenuStatistic = true;
  }

  public resetSubmenus() {
    this.subMenuStatistic = false;
  }
}
