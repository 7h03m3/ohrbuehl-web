import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardService } from './auth/role-guard.service';
import { Role } from './shared/enums/role.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full',
  },
  {
    path: 'public',
    loadChildren: () => import('./public/public.module').then((m) => m.PublicModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
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
    path: 'contact-message',
    loadChildren: () => import('./contact-messages/contact-message.module').then((m) => m.ContactMessageModule),
    canActivate: [RoleGuardService],
    data: {
      expectedRole: [Role.Admin, Role.ShootingRangeManager],
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
  {
    path: 'single-shooter',
    loadChildren: () => import('./single-shooter/single-shooter.module').then((m) => m.SingleShooterModule),
    canActivate: [RoleGuardService],
    data: {
      expectedRole: Role.SingleShooter,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
