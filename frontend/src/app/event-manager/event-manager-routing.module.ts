import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventManagerComponent } from './event-manager.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventShiftListComponent } from './components/event-shift-list/event-shift-list.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { EventShiftEditComponent } from './components/event-shift-edit/event-shift-edit.component';
import { StatisticEventShiftsBuComponent } from './components/statistic-event-shifts-bu/statistic-event-shifts-bu.component';
import { BusinessHourAdminDailyViewComponent } from '../business-hours/components/business-hour-admin-daily-view/business-hour-admin-daily-view.component';
import { BusinessHourAdminViewComponent } from '../business-hours/components/business-hour-admin-view/business-hour-admin-view.component';
import { BusinessHourAdminListComponent } from '../business-hours/components/business-hour-admin-list/business-hour-admin-list.component';

const routes: Routes = [
  {
    path: '',
    component: EventManagerComponent,
    children: [
      {
        path: '',
        component: EventShiftListComponent,
      },
      {
        path: 'event-list',
        component: EventListComponent,
      },
      {
        path: 'event-edit',
        component: EventEditComponent,
      },
      {
        path: 'event-shift-list',
        component: EventShiftListComponent,
      },
      {
        path: 'event-shift-edit',
        component: EventShiftEditComponent,
      },
      {
        path: 'statistic-event-shift',
        component: StatisticEventShiftsBuComponent,
      },
      {
        path: 'reservations',
        component: BusinessHourAdminDailyViewComponent,
      },
      {
        path: 'reservations/edit',
        component: BusinessHourAdminViewComponent,
      },
      {
        path: 'reservations/list',
        component: BusinessHourAdminListComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventManagerRoutingModule {}
