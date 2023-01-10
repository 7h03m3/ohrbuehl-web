import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationManagerComponent } from './organization-manager.component';
import { OrganizationInformationComponent } from './components/organization-information/organization-information.component';
import { OrganizationMemberListComponent } from './components/organization-member-list/organization-member-list.component';
import { OrganizationMemberEditComponent } from './components/organization-member-edit/organization-member-edit.component';
import { EventShiftListComponent } from './components/event-shift-list/event-shift-list.component';
import { EventShiftEditComponent } from './components/event-shift-edit/event-shift-edit.component';
import { EventStaffPoolEditComponent } from './components/event-staff-pool-edit/event-staff-pool-edit.component';

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
        path: 'event-staff-pool-edit',
        component: EventStaffPoolEditComponent,
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
