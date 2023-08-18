import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessHourAdminReservationListComponent } from './components/business-hour-admin-reservation-list/business-hour-admin-reservation-list.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { BusinessHourAdminViewComponent } from './components/business-hour-admin-view/business-hour-admin-view.component';
import { BusinessHourAdminListComponent } from './components/business-hour-admin-list/business-hour-admin-list.component';
import { BusinessHourAdminEditDialogComponent } from './components/business-hour-admin-edit-dialog/business-hour-admin-edit-dialog.component';
import { BusinessHourAdminReservationEditDialogComponent } from './components/business-hour-admin-reservation-edit-dialog/business-hour-admin-reservation-edit-dialog.component';
import { BusinessHourAdminDailyViewComponent } from './components/business-hour-admin-daily-view/business-hour-admin-daily-view.component';
import { BusinessHourNextReservationsComponent } from './components/business-hour-next-reservations/business-hour-next-reservations.component';
import { BusinessHourReservationListComponent } from './components/business-hour-reservation-list/business-hour-reservation-list.component';
import { BusinessHourReservationAddDialogComponent } from './components/business-hour-reservation-add-dialog/business-hour-reservation-add-dialog.component';
import { BusinessHourReservationEditDialogComponent } from './components/business-hour-reservation-edit-dialog/business-hour-reservation-edit-dialog.component';

@NgModule({
  declarations: [
    BusinessHourAdminReservationListComponent,
    BusinessHourAdminViewComponent,
    BusinessHourAdminListComponent,
    BusinessHourAdminEditDialogComponent,
    BusinessHourAdminReservationEditDialogComponent,
    BusinessHourAdminDailyViewComponent,
    BusinessHourNextReservationsComponent,
    BusinessHourReservationListComponent,
    BusinessHourReservationAddDialogComponent,
    BusinessHourReservationEditDialogComponent,
  ],
  exports: [
    BusinessHourAdminReservationListComponent,
    BusinessHourAdminViewComponent,
    BusinessHourAdminListComponent,
    BusinessHourAdminEditDialogComponent,
    BusinessHourAdminReservationEditDialogComponent,
    BusinessHourAdminDailyViewComponent,
    BusinessHourNextReservationsComponent,
    BusinessHourReservationListComponent,
  ],
  imports: [CommonModule, MaterialModule, SharedModule],
})
export class BusinessHoursModule {}
