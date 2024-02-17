import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicEventListComponent } from './components/public-event-list/public-event-list.component';
import { MaterialModule } from '../shared/material.module';
import { PublicRoutingModule } from './public-routing.module';
import { PublicWelcomeComponent } from './components/public-welcome/public-welcome.component';
import { PublicComponent } from './public.component';
import { PublicShootingRangeInformationComponent } from './components/public-shooting-range-information/public-shooting-range-information.component';
import { PublicBusinessHourListComponent } from './components/public-business-hour-list/public-business-hour-list.component';
import { PublicBusinessHourListOccupancyInfoComponent } from './components/public-business-hour-list/components/public-business-hour-list-occupancy-info/public-business-hour-list-occupancy-info.component';
import { PublicContactComponent } from './components/public-contact/public-contact.component';
import { SharedModule } from '../shared/shared.module';
import { PublicAntiBotCalculationComponent } from './components/public-anti-bot-calculation/public-anti-bot-calculation.component';
import { PublicTrackReservationComponent } from './components/public-track-reservation/public-track-reservation.component';
import { RecaptchaV3Module } from 'ng-recaptcha';
import { PublicFaqComponent } from './components/public-faq/public-faq.component';
import { PublicAllowedCaliberComponent } from './components/public-allowed-caliber/public-allowed-caliber.component';
import { PublicPricesComponent } from './components/public-prices/public-prices.component';
import { PublicRegistrationComponent } from './components/public-registration/public-registration.component';
import { PublicGeneralBusinessTermsComponent } from './components/public-general-business-terms/public-general-business-terms.component';
import { PublicSafetyRegulationsComponent } from './components/public-safety-regulations/public-safety-regulations.component';

@NgModule({
  declarations: [
    PublicWelcomeComponent,
    PublicEventListComponent,
    PublicComponent,
    PublicShootingRangeInformationComponent,
    PublicBusinessHourListComponent,
    PublicBusinessHourListOccupancyInfoComponent,
    PublicContactComponent,
    PublicAntiBotCalculationComponent,
    PublicTrackReservationComponent,
    PublicFaqComponent,
    PublicAllowedCaliberComponent,
    PublicPricesComponent,
    PublicRegistrationComponent,
    PublicGeneralBusinessTermsComponent,
    PublicSafetyRegulationsComponent,
  ],
  imports: [CommonModule, MaterialModule, PublicRoutingModule, SharedModule, RecaptchaV3Module],
})
export class PublicModule {}
