import { AppMenuEntry } from '../app-menu-entry';

export const appSingleShooterMenuEntries: AppMenuEntry[] = [
  {
    name: 'Einzelschütze',
    routerLink: '/single-shooter',
    icon: 'calendar_month',
    expanded: false,
    notVisibleInToolbar: false,
    subs: [
      {
        name: 'Informationen',
        routerLink: '/single-shooter/info',
        icon: 'info',
      },
      {
        name: 'Reservationen',
        routerLink: '/single-shooter/reservations/list',
        icon: 'donut_large',
      },
    ],
  },
];
