import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleShooterComponent } from './single-shooter.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { BusinessHoursModule } from '../business-hours/business-hours.module';
import { SingleShooterRoutingModule } from './single-shooter-routing.module';
import { SingleShooterInformationComponent } from './components/single-shooter-information/single-shooter-information.component';
import { SingleShooterReservationListComponent } from './components/single-shooter-reservation-list/single-shooter-reservation-list.component';

@NgModule({
  declarations: [SingleShooterComponent, SingleShooterInformationComponent, SingleShooterReservationListComponent],
  imports: [CommonModule, MaterialModule, SharedModule, SingleShooterRoutingModule, BusinessHoursModule],
})
export class SingleShooterModule {}
