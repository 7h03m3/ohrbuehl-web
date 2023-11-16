import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAccountInformationComponent } from './components/user-account-information/user-account-information.component';
import { RoleGuardService } from '../auth/role-guard.service';
import { UserPasswordChangeComponent } from './components/user-password-change/user-password-change.component';
import { Role } from '../shared/enums/role.enum';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'account',
    canActivate: [RoleGuardService],
    component: UserAccountInformationComponent,
    data: {
      expectedRole: [
        Role.Cashier,
        Role.Admin,
        Role.OrganizationManager,
        Role.ShootingRangeManager,
        Role.EventOrganizer,
        Role.User,
        Role.SingleShooter,
      ],
    },
  },
  {
    path: 'password-change',
    canActivate: [RoleGuardService],
    component: UserPasswordChangeComponent,
    data: {
      expectedRole: [
        Role.Cashier,
        Role.Admin,
        Role.OrganizationManager,
        Role.ShootingRangeManager,
        Role.EventOrganizer,
        Role.User,
        Role.SingleShooter,
      ],
    },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
