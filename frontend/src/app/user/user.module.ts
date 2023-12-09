import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountInformationComponent } from './components/user-account-information/user-account-information.component';
import { UserRoutingModule } from './user-routing.module';
import { UserPasswordChangeComponent } from './components/user-password-change/user-password-change.component';
import { MaterialModule } from '../shared/material.module';
import { LoginComponent } from './components/login/login.component';
import { UserAccountInformationEditDialogComponent } from './components/user-account-information-edit-dialog/user-account-information-edit-dialog.component';
import { RecaptchaV3Module } from 'ng-recaptcha';

@NgModule({
  declarations: [
    LoginComponent,
    UserAccountInformationComponent,
    UserPasswordChangeComponent,
    UserAccountInformationEditDialogComponent,
  ],
  imports: [CommonModule, UserRoutingModule, MaterialModule, RecaptchaV3Module],
})
export class UserModule {}
