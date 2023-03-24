import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicEventListComponent } from './components/public-event-list/public-event-list.component';
import { MaterialModule } from '../shared/material.module';
import { PublicRoutingModule } from './public-routing.module';
import { PublicWelcomeComponent } from './components/public-welcome/public-welcome.component';
import { PublicComponent } from './public.component';
import { PublicShootingRangeInformationComponent } from './components/public-shooting-range-information/public-shooting-range-information.component';

@NgModule({
  declarations: [PublicWelcomeComponent, PublicEventListComponent, PublicComponent, PublicShootingRangeInformationComponent],
  imports: [CommonModule, MaterialModule, PublicRoutingModule],
})
export class PublicModule {}
