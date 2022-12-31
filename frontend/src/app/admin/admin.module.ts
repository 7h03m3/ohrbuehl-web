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
import { AdminOrganizationCreateComponent } from './components/admin-organization-create/admin-organization-create.component';
import { AdminUserCreateComponent } from './components/admin-user-create/admin-user-create.component';
import { MaterialModule } from '../shared/material.module';
import { AdminComponent } from './admin.component';
import { AdminUserDeleteDialogComponent } from './components/admin-user-delete-dialog/admin-user-delete-dialog.component';
import { AdminOrganizationDeleteDialogComponent } from './components/admin-organization-delete-dialog/admin-organization-delete-dialog.component';
import { AdminShootingRangePriceDeleteDialogComponent } from './components/admin-shooting-range-price-delete-dialog/admin-shooting-range-price-delete-dialog.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminUserListComponent,
    AdminUserCreateComponent,
    AdminUserDeleteDialogComponent,
    AdminUserEditComponent,
    AdminOrganizationListComponent,
    AdminOrganizationCreateComponent,
    AdminOrganizationEditComponent,
    AdminOrganizationDeleteDialogComponent,
    AdminShootingRangePriceCreateComponent,
    AdminShootingRangePriceDeleteDialogComponent,
    AdminShootingRangePriceListComponent,
    AdminShootingRangePriceEditComponent,
  ],
  imports: [CommonModule, MaterialModule, AdminRoutingModule],
})
export class AdminModule {}
