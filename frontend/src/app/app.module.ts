import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/material.module';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { ShootingRangeDailyAccountingComponent } from './shooting-range/components/daily-accounting/shooting-range-daily-accounting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShotNumberTableComponent } from './shooting-range/components/daily-accounting/components/shot-number-table/shot-number-table.component';
import { TrackAssignmentComponent } from './shooting-range/components/daily-accounting/components/track-assignment/track-assignment.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './user/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AdminComponent } from './admin/admin.component';
import { AdminUserListComponent } from './admin/components/admin-user-list/admin-user-list.component';
import { AdminUserCreateComponent } from './admin/components/admin-user-create/admin-user-create.component';
import { MainWelcomeComponent } from './main/main-welcome/main-welcome.component';
import { AdminUserDeleteDialogComponent } from './admin/components/admin-user-delete-dialog/admin-user-delete-dialog.component';
import { AdminUserEditComponent } from './admin/components/admin-user-edit/admin-user-edit.component';
import { AdminOrganizationListComponent } from './admin/components/admin-organization-list/admin-organization-list.component';
import { AdminOrganizationCreateComponent } from './admin/components/admin-organization-create/admin-organization-create.component';
import { AdminOrganizationEditComponent } from './admin/components/admin-organization-edit/admin-organization-edit.component';
import { AdminOrganizationDeleteDialogComponent } from './admin/components/admin-organization-delete-dialog/admin-organization-delete-dialog.component';
import { AdminShootingRangePriceCreateComponent } from './admin/components/admin-shooting-range-price-create/admin-shooting-range-price-create.component';
import { AdminShootingRangePriceDeleteDialogComponent } from './admin/components/admin-shooting-range-price-delete-dialog/admin-shooting-range-price-delete-dialog.component';
import { AdminShootingRangePriceListComponent } from './admin/components/admin-shooting-range-price-list/admin-shooting-range-price-list.component';
import { AdminShootingRangePriceEditComponent } from './admin/components/admin-shooting-range-price-edit/admin-shooting-range-price-edit.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ShootingRangeComponent } from './shooting-range/shooting-range.component';
import { ShootingRangeInvoicesComponent } from './shooting-range/components/invoices/shooting-range-invoices.component';
import { InvoiceInformationComponent } from './invoice/components/invoice-information/invoice-information.component';
import { InvoiceItemEditComponent } from './invoice/components/invoice-item-edit/invoice-item-edit.component';
import { InvoiceDetailViewComponent } from './invoice/components/invoice-detail-view/invoice-detail-view.component';
import { InvoiceListComponent } from './invoice/components/invoice-list/invoice-list.component';
import { InvoiceViewComponent } from './invoice/components/invoice-view/invoice-view.component';
import { AccountingTypeSelectionComponent } from './shooting-range/components/daily-accounting/components/accounting-type-selection/accounting-type-selection.component';
import { EnterDateAndTimeComponent } from './shooting-range/components/daily-accounting/components/enter-date-and-time/enter-date-and-time.component';
import { UploadSiusDataComponent } from './shooting-range/components/daily-accounting/components/upload-sius-data/upload-sius-data.component';
import { ViewDetailComponent } from './shooting-range/components/daily-accounting/components/view-detail/view-detail.component';
import { ShootingRangeAccountingListComponent } from './shooting-range/components/shooting-range-accounting-list/shooting-range-accounting-list.component';
import { ShootingRangeAccountingViewComponent } from './shooting-range/components/shooting-range-accounting-view/shooting-range-accounting-view.component';
import { ShootingRangeAccountingEditComponent } from './shooting-range/components/shooting-range-accounting-edit/shooting-range-accounting-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ShootingRangeDailyAccountingComponent,
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
    AdminShootingRangePriceCreateComponent,
    AdminShootingRangePriceDeleteDialogComponent,
    AdminShootingRangePriceListComponent,
    AdminShootingRangePriceEditComponent,
    ShootingRangeComponent,
    ShootingRangeInvoicesComponent,
    InvoiceInformationComponent,
    InvoiceItemEditComponent,
    InvoiceDetailViewComponent,
    InvoiceListComponent,
    InvoiceViewComponent,
    AccountingTypeSelectionComponent,
    EnterDateAndTimeComponent,
    UploadSiusDataComponent,
    ViewDetailComponent,
    ShootingRangeAccountingListComponent,
    ShootingRangeAccountingViewComponent,
    ShootingRangeAccountingEditComponent,
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
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS,
    },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
