import { Injectable } from '@angular/core';
import { SidenavElement } from '../classes/sidenav-element';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private elements = new Array<SidenavElement>();
  private smallView = false;

  constructor() {}

  public getElements(): SidenavElement[] {
    return this.elements;
  }

  public setSmallView(enabled: boolean) {
    this.smallView = enabled;
  }

  public isSmallView(): boolean {
    return this.smallView;
  }

  public reset() {
    this.smallView = false;
    this.elements = new Array<SidenavElement>();
  }

  public addElement(label: string, icon: string, routerLink: string): SidenavElement {
    const element = new SidenavElement();
    element.label = label;
    element.icon = icon;
    element.routerLink = routerLink;
    this.elements.push(element);
    return element;
  }

  public addSubElement(parent: SidenavElement, label: string, icon: string, routerLink: string) {
    const element = new SidenavElement();
    element.label = label;
    element.icon = icon;
    element.routerLink = routerLink;
    parent.subItems.push(element);
  }
}
