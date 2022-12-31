import { NgModule } from '@angular/core';
import { AdminUserListComponent } from './components/admin-user-list/admin-user-list.component';
import { AdminUserEditComponent } from './components/admin-user-edit/admin-user-edit.component';
import { AdminUserCreateComponent } from './components/admin-user-create/admin-user-create.component';
import { AdminShootingRangePriceListComponent } from './components/admin-shooting-range-price-list/admin-shooting-range-price-list.component';
import { AdminShootingRangePriceEditComponent } from './components/admin-shooting-range-price-edit/admin-shooting-range-price-edit.component';
import { AdminShootingRangePriceCreateComponent } from './components/admin-shooting-range-price-create/admin-shooting-range-price-create.component';
import { AdminOrganizationListComponent } from './components/admin-organization-list/admin-organization-list.component';
import { AdminOrganizationEditComponent } from './components/admin-organization-edit/admin-organization-edit.component';
import { AdminOrganizationCreateComponent } from './components/admin-organization-create/admin-organization-create.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminUserListComponent,
      },
      {
        path: 'user-list',
        component: AdminUserListComponent,
      },
      {
        path: 'user-edit',
        component: AdminUserEditComponent,
      },
      {
        path: 'user-create',
        component: AdminUserCreateComponent,
      },
      {
        path: 'price-list',
        component: AdminShootingRangePriceListComponent,
      },
      {
        path: 'price-edit',
        component: AdminShootingRangePriceEditComponent,
      },
      {
        path: 'price-create',
        component: AdminShootingRangePriceCreateComponent,
      },
      {
        path: 'organization-list',
        component: AdminOrganizationListComponent,
      },
      {
        path: 'organization-edit',
        component: AdminOrganizationEditComponent,
      },
      {
        path: 'organization-create',
        component: AdminOrganizationCreateComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
