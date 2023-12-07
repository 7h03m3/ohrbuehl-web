import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicWelcomeComponent } from './components/public-welcome/public-welcome.component';
import { PublicEventListComponent } from './components/public-event-list/public-event-list.component';
import { PublicComponent } from './public.component';
import { PublicShootingRangeInformationComponent } from './components/public-shooting-range-information/public-shooting-range-information.component';
import { PublicBusinessHourListComponent } from './components/public-business-hour-list/public-business-hour-list.component';
import { PublicContactComponent } from './components/public-contact/public-contact.component';
import { PublicTrackReservationComponent } from './components/public-track-reservation/public-track-reservation.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full',
      },
      {
        path: 'welcome',
        component: PublicWelcomeComponent,
      },
      {
        path: 'shooting-range',
        component: PublicShootingRangeInformationComponent,
      },
      {
        path: 'event-list',
        component: PublicEventListComponent,
      },
      {
        path: 'business-hours',
        component: PublicBusinessHourListComponent,
      },
      {
        path: 'contact',
        component: PublicContactComponent,
      },
      {
        path: 'track-reservation',
        component: PublicTrackReservationComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
