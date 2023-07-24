import { NgModule } from '@angular/core';
import { AdminUserListComponent } from './components/admin-user-list/admin-user-list.component';
import { AdminUserEditComponent } from './components/admin-user-edit/admin-user-edit.component';
import { AdminShootingRangePriceListComponent } from './components/admin-shooting-range-price-list/admin-shooting-range-price-list.component';
import { AdminShootingRangePriceEditComponent } from './components/admin-shooting-range-price-edit/admin-shooting-range-price-edit.component';
import { AdminShootingRangePriceCreateComponent } from './components/admin-shooting-range-price-create/admin-shooting-range-price-create.component';
import { AdminOrganizationListComponent } from './components/admin-organization-list/admin-organization-list.component';
import { AdminOrganizationEditComponent } from './components/admin-organization-edit/admin-organization-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminEventCategoryListComponent } from './components/admin-event-category-list/admin-event-category-list.component';
import { AdminEventCategoryEditComponent } from './components/admin-event-category-edit/admin-event-category-edit.component';
import { AdminEventShiftCategoryListComponent } from './components/admin-event-shift-category-list/admin-event-shift-category-list.component';
import { AdminEventShiftCategoryEditComponent } from './components/admin-event-shift-category-edit/admin-event-shift-category-edit.component';
import { AdminNotifierListComponent } from './components/admin-notifier-list/admin-notifier-list.component';
import { BusinessHourAdminListComponent } from '../business-hours/components/business-hour-admin-list/business-hour-admin-list.component';
import { BusinessHourAdminViewComponent } from '../business-hours/components/business-hour-admin-view/business-hour-admin-view.component';

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
        path: 'event-category-list',
        component: AdminEventCategoryListComponent,
      },
      {
        path: 'event-category-edit',
        component: AdminEventCategoryEditComponent,
      },
      {
        path: 'event-shift-category-list',
        component: AdminEventShiftCategoryListComponent,
      },
      {
        path: 'event-shift-category-edit',
        component: AdminEventShiftCategoryEditComponent,
      },
      {
        path: 'notifier-list',
        component: AdminNotifierListComponent,
      },
      {
        path: 'business-hour-list',
        component: BusinessHourAdminListComponent,
      },
      {
        path: 'business-hour',
        component: BusinessHourAdminViewComponent,
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
