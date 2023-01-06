import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { MainWelcomeComponent } from './main/main-welcome/main-welcome.component';
import { RoleGuardService } from './auth/role-guard.service';
import { Role } from './shared/enums/role.enum';

const routes: Routes = [
  { path: '', component: MainWelcomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'shooting-range',
    loadChildren: () => import('./shooting-range/shooting-range.module').then((m) => m.ShootingRangeModule),
    canActivate: [RoleGuardService],
    data: {
      expectedRole: Role.ShootingRangeManager,
    },
  },
  {
    path: 'organization-manager',
    loadChildren: () =>
      import('./organization-manager/organization-manager.module').then((m) => m.OrganizationManagerModule),
    canActivate: [RoleGuardService],
    data: {
      expectedRole: Role.OrganizationManager,
    },
  },
  {
    path: 'event-manager',
    loadChildren: () => import('./event-manager/event-manager.module').then((m) => m.EventManagerModule),
    canActivate: [RoleGuardService],
    data: {
      expectedRole: Role.EventOrganizer,
    },
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [RoleGuardService],
    data: {
      expectedRole: Role.Admin,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
