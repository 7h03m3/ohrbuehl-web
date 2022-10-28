import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./user/login/login.component";
import {ShotNumbersComponent} from "./shot-numbers/shot-numbers.component";
import {AdminComponent} from "./admin/admin.component";
import {AdminUserListComponent} from "./admin/components/admin-user-list/admin-user-list.component";
import {AdminUserCreateComponent} from "./admin/components/admin-user-create/admin-user-create.component";
import {MainWelcomeComponent} from "./main/main-welcome/main-welcome.component";
import {AdminUserEditComponent} from "./admin/components/admin-user-edit/admin-user-edit.component";
import {
  AdminBulletPriceListComponent
} from "./admin/components/admin-bullet-price-list/admin-bullet-price-list.component";
import {
  AdminBulletPriceEditComponent
} from "./admin/components/admin-bullet-price-edit/admin-bullet-price-edit.component";
import {
  AdminBulletPriceCreateComponent
} from "./admin/components/admin-bullet-price-create/admin-bullet-price-create.component";
import {
  AdminOrganizationListComponent
} from "./admin/components/admin-organization-list/admin-organization-list.component";
import {
  AdminOrganizationEditComponent
} from "./admin/components/admin-organization-edit/admin-organization-edit.component";
import {
  AdminOrganizationCreateComponent
} from "./admin/components/admin-organization-create/admin-organization-create.component";
import {RoleGuardService} from "./auth/role-guard.service";
import {Role} from "./shared/enums/role.enum";
import {ShootingRangeComponent} from "./shooting-range/shooting-range.component";
import {ShootingRangeInvoicesComponent} from "./shooting-range/shooting-range-bills/shooting-range-invoices.component";


const routes: Routes = [
  {path: '', component: MainWelcomeComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'shooting-range', component: ShootingRangeComponent, canActivate: [RoleGuardService], data: {
      expectedRole: Role.ShootingRangeManager
    }, children: [
      {
        path: '',
        component: ShootingRangeInvoicesComponent
      }, {
        path: 'invoices',
        component: ShootingRangeInvoicesComponent
      }]
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [RoleGuardService], data: {
      expectedRole: Role.Admin
    }, children: [
      {
        path: '',
        component: AdminUserListComponent
      },
      {
        path: 'user-list',
        component: AdminUserListComponent
      },
      {
        path: 'user-edit',
        component: AdminUserEditComponent
      },
      {
        path: 'user-create',
        component: AdminUserCreateComponent
      },
      {
        path: 'bullet-price-list',
        component: AdminBulletPriceListComponent
      }, {
        path: 'bullet-price-edit',
        component: AdminBulletPriceEditComponent
      }, {
        path: 'bullet-price-create',
        component: AdminBulletPriceCreateComponent
      }, {
        path: 'organization-list',
        component: AdminOrganizationListComponent
      }, {
        path: 'organization-edit',
        component: AdminOrganizationEditComponent
      }, {
        path: 'organization-create',
        component: AdminOrganizationCreateComponent
      }]
  },
  {path: 'shot-number', component: ShotNumbersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
