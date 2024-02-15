import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminUserListComponent } from './components/admin-user-list/admin-user-list.component';
import { AdminUserEditComponent } from './components/admin-user-edit/admin-user-edit.component';
import { AdminShootingRangePriceListComponent } from './components/admin-shooting-range-price-list/admin-shooting-range-price-list.component';
import { AdminShootingRangePriceEditComponent } from './components/admin-shooting-range-price-edit/admin-shooting-range-price-edit.component';
import { AdminShootingRangePriceCreateComponent } from './components/admin-shooting-range-price-create/admin-shooting-range-price-create.component';
import { AdminOrganizationListComponent } from './components/admin-organization-list/admin-organization-list.component';
import { AdminOrganizationEditComponent } from './components/admin-organization-edit/admin-organization-edit.component';
import { MaterialModule } from '../shared/material.module';
import { AdminComponent } from './admin.component';
import { AdminUserDeleteDialogComponent } from './components/admin-user-delete-dialog/admin-user-delete-dialog.component';
import { AdminShootingRangePriceDeleteDialogComponent } from './components/admin-shooting-range-price-delete-dialog/admin-shooting-range-price-delete-dialog.component';

import { AdminEventCategoryListComponent } from './components/admin-event-category-list/admin-event-category-list.component';
import { AdminEventCategoryEditComponent } from './components/admin-event-category-edit/admin-event-category-edit.component';
import { AdminEventShiftCategoryListComponent } from './components/admin-event-shift-category-list/admin-event-shift-category-list.component';
import { AdminEventShiftCategoryEditComponent } from './components/admin-event-shift-category-edit/admin-event-shift-category-edit.component';
import { AdminNotifierListComponent } from './components/admin-notifier-list/admin-notifier-list.component';
import { AdminNotifierEditDialogComponent } from './components/admin-notifier-edit-dialog/admin-notifier-edit-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { BusinessHoursModule } from '../business-hours/business-hours.module';
import { AdminOrganizationFeatureListComponent } from './components/admin-organization-feature-list/admin-organization-feature-list.component';
import { AdminOrganizationFeatureDialogComponent } from './components/admin-organization-feature-dialog/admin-organization-feature-dialog.component';
import { AdminFileListComponent } from './components/admin-file-list/admin-file-list.component';
import { AdminFileDialogComponent } from './components/admin-file-dialog/admin-file-dialog.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminUserListComponent,
    AdminUserDeleteDialogComponent,
    AdminUserEditComponent,
    AdminOrganizationListComponent,
    AdminOrganizationEditComponent,
    AdminShootingRangePriceCreateComponent,
    AdminShootingRangePriceDeleteDialogComponent,
    AdminShootingRangePriceListComponent,
    AdminShootingRangePriceEditComponent,
    AdminEventCategoryListComponent,
    AdminEventCategoryEditComponent,
    AdminEventShiftCategoryListComponent,
    AdminEventShiftCategoryEditComponent,
    AdminNotifierListComponent,
    AdminNotifierEditDialogComponent,
    AdminOrganizationFeatureListComponent,
    AdminOrganizationFeatureDialogComponent,
    AdminFileListComponent,
    AdminFileDialogComponent,
  ],
  imports: [CommonModule, MaterialModule, SharedModule, AdminRoutingModule, BusinessHoursModule],
})
export class AdminModule {}
