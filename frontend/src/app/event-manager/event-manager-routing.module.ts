import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventManagerComponent } from './event-manager.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventShiftListComponent } from './components/event-shift-list/event-shift-list.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { EventShiftEditComponent } from './components/event-shift-edit/event-shift-edit.component';

const routes: Routes = [
  {
    path: '',
    component: EventManagerComponent,
    children: [
      {
        path: '',
        component: EventListComponent,
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
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventManagerRoutingModule {}
