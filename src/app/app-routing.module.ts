import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from './content/content.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { AuthGuard } from './auth/auth-guard/auth.guard';
import { NoAuthGuard } from './auth/auth-guard/no-auth.guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './auth/verify-otp/verify-otp.component';
import { CreatePasswordComponent } from './auth/create-password/create-password.component';
// import { EventComponent } from './content/event/event.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LogInComponent, 
    canActivate: [NoAuthGuard], 
  },
  {
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  { 
    path: 'forgot-password', 
    component: ForgotPasswordComponent, 
    canActivate: [NoAuthGuard], 
  },
  { 
    path: 'verify-otp', 
    component: VerifyOtpComponent, 
    canActivate: [NoAuthGuard], 
  },
  { 
    path: 'create-password', 
    component: CreatePasswordComponent, 
    canActivate: [NoAuthGuard], 
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: ContentComponent,
    loadChildren: () => import('./content/content.module').then(m => m.ContentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// , { useHash: true }
