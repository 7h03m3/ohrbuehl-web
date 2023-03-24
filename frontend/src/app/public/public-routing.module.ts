import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicWelcomeComponent } from './components/public-welcome/public-welcome.component';
import { PublicEventListComponent } from './components/public-event-list/public-event-list.component';
import { PublicComponent } from './public.component';
import { PublicShootingRangeInformationComponent } from './components/public-shooting-range-information/public-shooting-range-information.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full',
      },
      {
        path: 'welcome',
        component: PublicWelcomeComponent,
      },
      {
        path: 'shooting-range',
        component: PublicShootingRangeInformationComponent,
      },
      {
        path: 'event-list',
        component: PublicEventListComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
