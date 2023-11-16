import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactMessageListComponent } from './components/contact-message-list/contact-message-list.component';
import { ContactMessageRoutingModule } from './contact-message-routing.module';
import { MaterialModule } from '../shared/material.module';
import { ContactMessagesComponent } from './contact-messages.component';
import { SharedModule } from '../shared/shared.module';
import { ContactMessageDialogComponent } from './components/contact-message-dialog/contact-message-dialog.component';

@NgModule({
  declarations: [ContactMessageListComponent, ContactMessagesComponent, ContactMessageDialogComponent],
  imports: [CommonModule, MaterialModule, ContactMessageRoutingModule, SharedModule],
})
export class ContactMessageModule {}
