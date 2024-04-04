import { Component, Input, OnInit } from '@angular/core';
import { AppMenuEntry, AppSubmenuEntry } from '../../../app-menu-entry';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-menu-icon',
  templateUrl: './toolbar-menu-icon.component.html',
  styleUrls: ['./toolbar-menu-icon.component.css'],
})
export class ToolbarMenuIconComponent implements OnInit {
  @Input() color = '';
  @Input() menuEntry!: AppMenuEntry;

  public constructor(private router: Router) {}

  public ngOnInit() {}

  public onMenuClick(subEntry: AppSubmenuEntry) {
    this.router.navigateByUrl(subEntry.routerLink);
  }

  public hasChildren(): boolean {
    return this.menuEntry.subs.length != 0;
  }
}
