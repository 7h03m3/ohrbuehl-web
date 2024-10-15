import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationListComponent } from './components/application-list/application-list.component';
import { ApplicationsComponent } from './applications.component';
import { ApplicationEditComponent } from './components/application-edit/application-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationsComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      { path: 'list', component: ApplicationListComponent },
      { path: 'edit', component: ApplicationEditComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationsRoutingModule {}
