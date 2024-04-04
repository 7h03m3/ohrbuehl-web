export interface AppSubmenuEntry {
  name: string;
  routerLink: string;
  icon: string;
}

export interface AppMenuEntry extends AppSubmenuEntry {
  subs: AppSubmenuEntry[];
  expanded: boolean;
  notVisibleInToolbar: boolean;
}
