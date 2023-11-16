import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactMessageListComponent } from './components/contact-message-list/contact-message-list.component';
import { ContactMessagesComponent } from './contact-messages.component';

const routes: Routes = [
  {
    path: '',
    component: ContactMessagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      { path: 'list', component: ContactMessageListComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactMessageRoutingModule {}
