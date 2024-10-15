import { NgModule } from '@angular/core';
import { DATE_PIPE_DEFAULT_OPTIONS, DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { CdkTreeModule } from '@angular/cdk/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { GermanMatPaginatorIntl } from './shared/classes/german-mat-paginator-intl';
import { UrlService } from './shared/services/url.service';
import { environment } from '../environments/environment';
import { RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { MaterialModule } from './shared/material.module';
import { ToolbarMenuButtonComponent } from './shared/components/toolbar-menu-button/toolbar-menu-button.component';
import { ToolbarMenuIconComponent } from './shared/components/toolbar-menu-icon/toolbar-menu-icon.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, ToolbarMenuButtonComponent, ToolbarMenuIconComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CdkTreeModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    SharedModule,
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
    { provide: MAT_DATE_LOCALE, useValue: 'de-CH' },
    {
      provide: MatPaginatorIntl,
      useClass: GermanMatPaginatorIntl,
    },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    },
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'dd.MM.yyyy' } },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {
  constructor(private urlService: UrlService) {}
}
