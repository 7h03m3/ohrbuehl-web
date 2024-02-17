import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

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
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CdkTreeModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatToolbarModule,
    MatButtonModule,
    AppRoutingModule,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private urlService: UrlService) {}
}
