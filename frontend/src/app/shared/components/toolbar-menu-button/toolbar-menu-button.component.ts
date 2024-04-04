import { Component, Input } from '@angular/core';
import { AppMenuEntry, AppSubmenuEntry } from '../../../app-menu-entry';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-menu-button',
  templateUrl: './toolbar-menu-button.component.html',
  styleUrls: ['./toolbar-menu-button.component.css'],
})
export class ToolbarMenuButtonComponent {
  @Input() menuEntry!: AppMenuEntry;

  public constructor(private router: Router) {}

  public onMenuClick(subEntry: AppSubmenuEntry) {
    this.router.navigateByUrl(subEntry.routerLink);
  }

  public hasChildren(): boolean {
    return this.menuEntry.subs.length != 0;
  }
}
