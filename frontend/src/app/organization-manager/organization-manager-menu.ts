import { AppMenuEntry } from '../app-menu-entry';

export const appOrganizationManagerMenuEntries: AppMenuEntry[] = [
  {
    name: 'Vereinspräsident',
    routerLink: '/organization-manager',
    icon: 'groups',
    expanded: false,
    notVisibleInToolbar: false,
    subs: [
      {
        name: 'Informationen',
        routerLink: '/organization-manager/info',
        icon: 'info',
      },
      {
        name: 'Reservationen',
        routerLink: '/organization-manager/reservations/list',
        icon: 'donut_large',
      },
    ],
  },
];
