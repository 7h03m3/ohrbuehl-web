import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from "./shared/material.module";
import {DatePipe} from '@angular/common';

import {AppComponent} from './app.component';
import {ShotNumbersComponent} from './shot-numbers/shot-numbers.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShotNumberTableComponent} from './shot-numbers/components/shot-number-table/shot-number-table.component';
import {TrackAssignmentComponent} from './shot-numbers/components/track-assignment/track-assignment.component';
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from './user/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./auth/auth-interceptor";
import {AdminComponent} from './admin/admin.component';
import {AdminUserListComponent} from './admin/components/admin-user-list/admin-user-list.component';
import { AdminUserCreateComponent } from './admin/components/admin-user-create/admin-user-create.component';
import { MainWelcomeComponent } from './main/main-welcome/main-welcome.component';
import { AdminUserDeleteDialogComponent } from './admin/components/admin-user-delete-dialog/admin-user-delete-dialog.component';
import { AdminUserEditComponent } from './admin/components/admin-user-edit/admin-user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ShotNumbersComponent,
    ShotNumberTableComponent,
    TrackAssignmentComponent,
    LoginComponent,
    AdminComponent,
    AdminUserListComponent,
    AdminUserCreateComponent,
    MainWelcomeComponent,
    AdminUserDeleteDialogComponent,
    AdminUserEditComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
