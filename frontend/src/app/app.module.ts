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
import {AdminUserCreateComponent} from './admin/components/admin-user-create/admin-user-create.component';
import {MainWelcomeComponent} from './main/main-welcome/main-welcome.component';
import {
  AdminUserDeleteDialogComponent
} from './admin/components/admin-user-delete-dialog/admin-user-delete-dialog.component';
import {AdminUserEditComponent} from './admin/components/admin-user-edit/admin-user-edit.component';
import {
  AdminOrganizationListComponent
} from './admin/components/admin-organization-list/admin-organization-list.component';
import {
  AdminOrganizationCreateComponent
} from './admin/components/admin-organization-create/admin-organization-create.component';
import {
  AdminOrganizationEditComponent
} from './admin/components/admin-organization-edit/admin-organization-edit.component';
import {
  AdminOrganizationDeleteDialogComponent
} from './admin/components/admin-organization-delete-dialog/admin-organization-delete-dialog.component';
import {
  AdminBulletPriceCreateComponent
} from './admin/components/admin-bullet-price-create/admin-bullet-price-create.component';
import {
  AdminBulletPriceDeleteDialogComponent
} from './admin/components/admin-bullet-price-delete-dialog/admin-bullet-price-delete-dialog.component';
import {
  AdminBulletPriceListComponent
} from './admin/components/admin-bullet-price-list/admin-bullet-price-list.component';
import {
  AdminBulletPriceEditComponent
} from './admin/components/admin-bullet-price-edit/admin-bullet-price-edit.component';
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";

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
    AdminUserEditComponent,
    AdminOrganizationListComponent,
    AdminOrganizationCreateComponent,
    AdminOrganizationEditComponent,
    AdminOrganizationDeleteDialogComponent,
    AdminBulletPriceCreateComponent,
    AdminBulletPriceDeleteDialogComponent,
    AdminBulletPriceListComponent,
    AdminBulletPriceEditComponent
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
  }, {
    provide: JWT_OPTIONS,
    useValue: JWT_OPTIONS
  },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
