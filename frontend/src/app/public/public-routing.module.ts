import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicWelcomeComponent } from './components/public-welcome/public-welcome.component';
import { PublicEventListComponent } from './components/public-event-list/public-event-list.component';
import { PublicComponent } from './public.component';
import { PublicShootingRangeInformationComponent } from './components/public-shooting-range-information/public-shooting-range-information.component';
import { PublicBusinessHourListComponent } from './components/public-business-hour-list/public-business-hour-list.component';
import { PublicContactComponent } from './components/public-contact/public-contact.component';
import { PublicTrackReservationComponent } from './components/public-track-reservation/public-track-reservation.component';
import { PublicFaqComponent } from './components/public-faq/public-faq.component';
import { PublicAllowedCaliberComponent } from './components/public-allowed-caliber/public-allowed-caliber.component';
import { PublicPricesComponent } from './components/public-prices/public-prices.component';
import { PublicRegistrationComponent } from './components/public-registration/public-registration.component';
import { PublicGeneralBusinessTermsComponent } from './components/public-general-business-terms/public-general-business-terms.component';
import { PublicSafetyRegulationsComponent } from './components/public-safety-regulations/public-safety-regulations.component';
import { PublicApplicationComponent } from './components/public-application/public-application.component';

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
      {
        path: 'allowed-caliber',
        component: PublicAllowedCaliberComponent,
      },
      {
        path: 'prices',
        component: PublicPricesComponent,
      },
      {
        path: 'faq',
        component: PublicFaqComponent,
      },
      {
        path: 'registration',
        component: PublicRegistrationComponent,
      },
      {
        path: 'general-business-terms',
        component: PublicGeneralBusinessTermsComponent,
      },
      {
        path: 'safety-regulations',
        component: PublicSafetyRegulationsComponent,
      },
      {
        path: 'application/:requestId',
        component: PublicApplicationComponent,
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
