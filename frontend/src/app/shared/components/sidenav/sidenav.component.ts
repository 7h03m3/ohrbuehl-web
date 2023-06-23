import { Component } from '@angular/core';
import { SidenavElement } from '../../classes/sidenav-element';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  public elements: SidenavElement[];

  public constructor(private sidenavService: SidenavService) {
    this.elements = this.sidenavService.getElements();
  }

  public isSmallView(): boolean {
    return this.sidenavService.isSmallView();
  }

  public toggleView() {
    this.sidenavService.setSmallView(!this.sidenavService.isSmallView());
  }

  public onElementClick(element: SidenavElement) {
    this.deselectAllElements();
    element.selected = true;
  }

  public getTooltip(element: SidenavElement) {
    return this.isSmallView() ? element.label : '';
  }

  private deselectAllElements() {
    this.elements.forEach((current) => {
      current.selected = false;
    });
  }
}
