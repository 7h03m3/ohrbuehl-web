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

@NgModule({
  declarations: [
    OrganizationInformationComponent,
    OrganizationManagerComponent,
    OrganizationMemberListComponent,
    OrganizationMemberEditComponent,
    EventShiftListComponent,
    EventShiftEditComponent,
  ],
  imports: [CommonModule, MaterialModule, OrganizationManagerRoutingModule],
})
export class OrganizationManagerModule {}
