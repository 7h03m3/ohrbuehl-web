import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./user/login/login.component";
import {ShotNumbersComponent} from "./shot-numbers/shot-numbers.component";
import {AdminComponent} from "./admin/admin.component";
import {AdminUserListComponent} from "./admin/components/admin-user-list/admin-user-list.component";
import {AdminUserCreateComponent} from "./admin/components/admin-user-create/admin-user-create.component";
import {MainWelcomeComponent} from "./main/main-welcome/main-welcome.component";
import {AdminUserEditComponent} from "./admin/components/admin-user-edit/admin-user-edit.component";


const routes: Routes = [
  {path: '', component: MainWelcomeComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'admin', component: AdminComponent, children: [
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
