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

@NgModule({
  declarations: [
    PublicWelcomeComponent,
    PublicEventListComponent,
    PublicComponent,
    PublicShootingRangeInformationComponent,
    PublicBusinessHourListComponent,
    PublicBusinessHourListOccupancyInfoComponent,
    PublicContactComponent,
  ],
  imports: [CommonModule, MaterialModule, PublicRoutingModule],
})
export class PublicModule {}
