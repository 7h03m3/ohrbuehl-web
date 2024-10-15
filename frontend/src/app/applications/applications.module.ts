import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './applications.component';
import { ApplicationListComponent } from './components/application-list/application-list.component';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { ApplicationEditComponent } from './components/application-edit/application-edit.component';
import { ApplicationEditFileListComponent } from './components/application-edit/components/application-edit-file-list/application-edit-file-list.component';
import { ApplicationEditInformationComponent } from './components/application-edit/components/application-edit-information/application-edit-information.component';
import { ApplicationEditDatePickerComponent } from './components/application-edit/components/application-edit-date-picker/application-edit-date-picker.component';
import { ApplicationReasonDialogComponent } from './components/application-reason-dialog/application-reason-dialog.component';

@NgModule({
  declarations: [ApplicationsComponent, ApplicationListComponent, ApplicationEditComponent, ApplicationEditFileListComponent, ApplicationEditInformationComponent, ApplicationEditDatePickerComponent, ApplicationReasonDialogComponent],
  imports: [CommonModule, SharedModule, MaterialModule, ApplicationsRoutingModule, MatSortModule, MatTableModule],
})
export class ApplicationsModule {}
