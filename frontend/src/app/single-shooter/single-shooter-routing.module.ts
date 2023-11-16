import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleShooterComponent } from './single-shooter.component';
import { SingleShooterInformationComponent } from './components/single-shooter-information/single-shooter-information.component';
import { SingleShooterReservationListComponent } from './components/single-shooter-reservation-list/single-shooter-reservation-list.component';

const routes: Routes = [
  {
    path: '',
    component: SingleShooterComponent,
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full',
      },
      {
        path: 'info',
        component: SingleShooterInformationComponent,
      },
      {
        path: 'reservations/list',
        component: SingleShooterReservationListComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleShooterRoutingModule {}
