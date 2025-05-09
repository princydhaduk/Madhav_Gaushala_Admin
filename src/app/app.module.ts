import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { TranslateModule, TranslateLoader, TranslateService } from  '@ngx-translate/core';
// import { TranslateHttpLoader } from  '@ngx-translate/http-loader';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LogInComponent } from './auth/log-in/log-in.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RatingModule } from 'primeng/rating';
import { ImageModule } from 'primeng/image';
import { MatExpansionModule } from '@angular/material/expansion';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { GlobalFunctions } from './common/global-function';
import { MatTableModule } from '@angular/material/table';
import { DropdownModule } from 'primeng/dropdown';
import { ColorPickerModule } from 'primeng/colorpicker';
import { MatSelectModule } from '@angular/material/select';
import { NgxEditorModule } from 'ngx-editor';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgChartsModule } from 'ng2-charts';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ContentModule } from './content/content.module';
import { CreatePasswordComponent } from './auth/create-password/create-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './auth/verify-otp/verify-otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { GlobalService } from './services/global.service';
import { ReportsFilterComponent } from './common/reports-filter/reports-filter.component';
// import { checkPermission } from './common/checkPermission';
// import { SocketioService } from './services/socketio.service';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    ForgotPasswordComponent,
    VerifyOtpComponent,
    CreatePasswordComponent,
    ReportsFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContentModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    RatingModule,
    FormsModule,
    DropdownModule,
    ImageModule,
    MatExpansionModule,
    PaginatorModule,
    ProgressBarModule,
    MatTableModule,
    ColorPickerModule,
    MatSelectModule,
    NgxEditorModule,
    RadioButtonModule,
    NgChartsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgOtpInputModule,
  ],
  providers: [
    GlobalFunctions,
    GlobalService,
    DatePipe,
    { provide: window, useValue: window }
  ],
  exports: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
