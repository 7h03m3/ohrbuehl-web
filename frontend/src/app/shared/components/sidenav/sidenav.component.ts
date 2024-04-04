import { Component, OnInit } from '@angular/core';
import { SidenavElement } from '../../classes/sidenav-element';
import { SidenavService } from '../../services/sidenav.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  public elements: SidenavElement[];
  public isMobileView = false;

  public constructor(private sidenavService: SidenavService, private responsive: BreakpointObserver) {
    this.elements = this.sidenavService.getElements();
  }

  public ngOnInit() {
    this.responsive.observe(Breakpoints.Handset).subscribe((result) => {
      this.isMobileView = result.matches;
    });
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
