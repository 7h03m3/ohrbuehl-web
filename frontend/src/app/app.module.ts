import { NgModule } from '@angular/core';
import { MaterialModule } from './shared/material.module';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './user/components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { CdkTreeModule } from '@angular/cdk/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { UserPasswordChangeComponent } from './user/components/user-password-change/user-password-change.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, UserPasswordChangeComponent],
  imports: [BrowserModule, BrowserAnimationsModule, CdkTreeModule, HttpClientModule, MaterialModule, AppRoutingModule],
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
