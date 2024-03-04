import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationManagerComponent } from './organization-manager.component';
import { OrganizationInformationComponent } from './components/organization-information/organization-information.component';
import { OrganizationMemberListComponent } from './components/organization-member-list/organization-member-list.component';
import { OrganizationMemberEditComponent } from './components/organization-member-edit/organization-member-edit.component';
import { EventShiftListComponent } from './components/event-shift-list/event-shift-list.component';
import { EventShiftEditComponent } from './components/event-shift-edit/event-shift-edit.component';
import { EventStaffStatisticComponent } from './components/event-staff-statistic/event-staff-statistic.component';
import { EventShiftDownloadsComponent } from './components/event-shift-downloads/event-shift-downloads.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { EventStaffAvailabilityEditComponent } from './components/event-staff-availability-edit/event-staff-availability-edit.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationManagerComponent,
    children: [
      {
        path: '',
        component: OrganizationInformationComponent,
      },
      {
        path: 'info',
        component: OrganizationInformationComponent,
      },
      {
        path: 'member-list',
        component: OrganizationMemberListComponent,
      },
      {
        path: 'member-edit',
        component: OrganizationMemberEditComponent,
      },
      {
        path: 'event-shift-list',
        component: EventShiftListComponent,
      },
      {
        path: 'event-shift-edit',
        component: EventShiftEditComponent,
      },
      {
        path: 'event-shift-downloads',
        component: EventShiftDownloadsComponent,
      },
      {
        path: 'event-staff-availability-edit',
        component: EventStaffAvailabilityEditComponent,
      },
      {
        path: 'event-staff-statistic',
        component: EventStaffStatisticComponent,
      },
      {
        path: 'reservations/list',
        component: ReservationListComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationManagerRoutingModule {}
