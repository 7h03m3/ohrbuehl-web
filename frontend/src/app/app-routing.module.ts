import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { ShootingRangeDailyAccountingComponent } from './shooting-range/components/daily-accounting/shooting-range-daily-accounting.component';
import { AdminComponent } from './admin/admin.component';
import { AdminUserListComponent } from './admin/components/admin-user-list/admin-user-list.component';
import { AdminUserCreateComponent } from './admin/components/admin-user-create/admin-user-create.component';
import { MainWelcomeComponent } from './main/main-welcome/main-welcome.component';
import { AdminUserEditComponent } from './admin/components/admin-user-edit/admin-user-edit.component';
import { AdminShootingRangePriceListComponent } from './admin/components/admin-shooting-range-price-list/admin-shooting-range-price-list.component';
import { AdminShootingRangePriceEditComponent } from './admin/components/admin-shooting-range-price-edit/admin-shooting-range-price-edit.component';
import { AdminShootingRangePriceCreateComponent } from './admin/components/admin-shooting-range-price-create/admin-shooting-range-price-create.component';
import { AdminOrganizationListComponent } from './admin/components/admin-organization-list/admin-organization-list.component';
import { AdminOrganizationEditComponent } from './admin/components/admin-organization-edit/admin-organization-edit.component';
import { AdminOrganizationCreateComponent } from './admin/components/admin-organization-create/admin-organization-create.component';
import { RoleGuardService } from './auth/role-guard.service';
import { Role } from './shared/enums/role.enum';
import { ShootingRangeComponent } from './shooting-range/shooting-range.component';
import { ShootingRangeInvoicesComponent } from './shooting-range/components/invoices/shooting-range-invoices.component';
import { InvoiceListComponent } from './invoice/components/invoice-list/invoice-list.component';
import { InvoiceViewComponent } from './invoice/components/invoice-view/invoice-view.component';
import { ShootingRangeAccountingListComponent } from './shooting-range/components/shooting-range-accounting-list/shooting-range-accounting-list.component';
import { ShootingRangeAccountingViewComponent } from './shooting-range/components/shooting-range-accounting-view/shooting-range-accounting-view.component';
import { ShootingRangeAccountingEditComponent } from './shooting-range/components/shooting-range-accounting-edit/shooting-range-accounting-edit.component';

const routes: Routes = [
  { path: '', component: MainWelcomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'shooting-range',
    component: ShootingRangeComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: Role.ShootingRangeManager,
    },
    children: [
      {
        path: '',
        redirectTo: 'daily-accounting',
        pathMatch: 'full',
      },
      {
        path: 'invoice-list',
        component: InvoiceListComponent,
      },
      {
        path: 'invoice-edit',
        component: ShootingRangeInvoicesComponent,
      },
      {
        path: 'invoice-view',
        component: InvoiceViewComponent,
      },
      {
        path: 'daily-accounting',
        component: ShootingRangeDailyAccountingComponent,
      },
      {
        path: 'accounting-list',
        component: ShootingRangeAccountingListComponent,
      },
      {
        path: 'accounting-view',
        component: ShootingRangeAccountingViewComponent,
      },
      {
        path: 'accounting-edit',
        component: ShootingRangeAccountingEditComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: Role.Admin,
    },
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
  { path: 'shot-number', component: ShootingRangeDailyAccountingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
