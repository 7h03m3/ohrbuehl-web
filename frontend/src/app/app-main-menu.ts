import { AppMenuEntry } from './app-menu-entry';

export const appMainMenuEntries: AppMenuEntry[] = [
  {
    name: 'Home',
    routerLink: '/',
    icon: '',
    expanded: false,
    notVisibleInToolbar: true,
    subs: [],
  },
  {
    name: 'Öffnungszeiten',
    routerLink: '/public/business-hours',
    icon: '',
    expanded: false,
    notVisibleInToolbar: false,
    subs: [],
  },
  {
    name: 'Anlässe',
    routerLink: '',
    icon: '',
    expanded: false,
    notVisibleInToolbar: false,
    subs: [
      {
        name: 'Alle',
        icon: '',
        routerLink: '/public/event-list',
      },
      {
        name: 'Bundesübung (Gewehr)',
        icon: '',
        routerLink: 'public/event-list;category=BU',
      },
      {
        name: 'Bundesübung (Pistole)',
        icon: '',
        routerLink: 'public/event-list;category=BUP',
      },
      {
        name: 'Feldschiessen',
        icon: '',
        routerLink: 'public/event-list;category=FS',
      },
      {
        name: 'Nachschiesskurs',
        icon: '',
        routerLink: 'public/event-list;category=NSK',
      },
    ],
  },
  {
    name: 'Schiessanlage',
    icon: '',
    routerLink: '',
    expanded: false,
    notVisibleInToolbar: false,
    subs: [
      {
        name: 'Informationen',
        icon: '',
        routerLink: '/public/shooting-range',
      },
      {
        name: 'Erlaubte Kaliber',
        icon: '',
        routerLink: '/public/allowed-caliber',
      },
      {
        name: 'Preise',
        icon: '',
        routerLink: '/public/prices',
      },
      {
        name: 'Scheibenreservationen',
        icon: '',
        routerLink: '/public/track-reservation',
      },
      {
        name: 'Häufig gestellte Fragen',
        icon: '',
        routerLink: '/public/faq',
      },
      {
        name: 'Registrierung',
        icon: '',
        routerLink: '/public/registration',
      },
      {
        name: 'Kontakt',
        icon: '',
        routerLink: '/public/contact',
      },
      {
        name: 'AGB',
        icon: '',
        routerLink: '/public/general-business-terms',
      },
      {
        name: 'Sicherheitsbestimmungen',
        icon: '',
        routerLink: '/public/safety-regulations',
      },
    ],
  },
];
