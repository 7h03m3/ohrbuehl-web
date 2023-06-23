import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { OrganizationManagerRoutingModule } from './organization-manager-routing.module';
import { OrganizationInformationComponent } from './components/organization-information/organization-information.component';
import { OrganizationManagerComponent } from './organization-manager.component';
import { OrganizationMemberListComponent } from './components/organization-member-list/organization-member-list.component';
import { OrganizationMemberEditComponent } from './components/organization-member-edit/organization-member-edit.component';
import { EventShiftListComponent } from './components/event-shift-list/event-shift-list.component';
import { EventShiftEditComponent } from './components/event-shift-edit/event-shift-edit.component';
import { EventStaffPoolEditComponent } from './components/event-staff-pool-edit/event-staff-pool-edit.component';
import { EventStaffStatisticComponent } from './components/event-staff-statistic/event-staff-statistic.component';
import { OrganizationMemberVvaImportComponent } from './components/organization-member-vva-import/organization-member-vva-import.component';
import { EventShiftDownloadsComponent } from './components/event-shift-downloads/event-shift-downloads.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    OrganizationInformationComponent,
    OrganizationManagerComponent,
    OrganizationMemberListComponent,
    OrganizationMemberEditComponent,
    EventShiftListComponent,
    EventShiftEditComponent,
    EventStaffPoolEditComponent,
    EventStaffStatisticComponent,
    OrganizationMemberVvaImportComponent,
    EventShiftDownloadsComponent,
  ],
  imports: [CommonModule, MaterialModule, SharedModule, OrganizationManagerRoutingModule],
})
export class OrganizationManagerModule {}
