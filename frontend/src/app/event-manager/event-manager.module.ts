import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { EventManagerRoutingModule } from './event-manager-routing.module';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventShiftListComponent } from './components/event-shift-list/event-shift-list.component';
import { EventManagerComponent } from './event-manager.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { EventShiftEditComponent } from './components/event-shift-edit/event-shift-edit.component';
import { EventShiftEditDialogComponent } from './components/event-shift-edit-dialog/event-shift-edit-dialog.component';
import { StatisticEventShiftsTableComponent } from './components/statistic-event-shifts/statistic-event-shifts-table.component';
import { StatisticEventShiftsBuComponent } from './components/statistic-event-shifts-bu/statistic-event-shifts-bu.component';

@NgModule({
  declarations: [
    EventManagerComponent,
    EventListComponent,
    EventShiftListComponent,
    EventEditComponent,
    EventShiftEditComponent,
    EventShiftEditDialogComponent,
    StatisticEventShiftsTableComponent,
    StatisticEventShiftsBuComponent,
  ],
  imports: [CommonModule, MaterialModule, EventManagerRoutingModule],
})
export class EventManagerModule {}
