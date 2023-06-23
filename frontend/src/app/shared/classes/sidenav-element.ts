export class SidenavElement {
  public routerLink: string;
  public icon: string;
  public label: string;
  public subItems: SidenavElement[];
  public selected: boolean;

  constructor() {
    this.routerLink = '';
    this.icon = '';
    this.label = '';
    this.subItems = new Array<SidenavElement>();
    this.selected = false;
  }
}
