import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in/log-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { CreatePasswordComponent } from './create-password/create-password.component';



@NgModule({
  declarations: [
    // LogInComponent
  
    // ForgotPasswordComponent,
    // VerifyOtpComponent,
    // CreatePasswordComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
