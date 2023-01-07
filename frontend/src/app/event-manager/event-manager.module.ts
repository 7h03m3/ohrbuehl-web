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

@NgModule({
  declarations: [EventManagerComponent, EventListComponent, EventShiftListComponent, EventEditComponent, EventShiftEditComponent, EventShiftEditDialogComponent],
  imports: [CommonModule, MaterialModule, EventManagerRoutingModule],
})
export class EventManagerModule {}
