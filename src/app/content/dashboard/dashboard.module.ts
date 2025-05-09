import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { NgChartsModule } from 'ng2-charts';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MatSortModule } from '@angular/material/sort';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

const routes:Routes = [
  {
    path:'',
    component:DashboardComponent,
  }
]

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgChartsModule,
    MatTableModule,
    DropdownModule,
    FormsModule,
    InputSwitchModule,
    MatSortModule,
    ReactiveFormsModule,
    InputTextareaModule,
    InputTextModule,
    PaginatorModule,
    NgxDaterangepickerMd.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    { provide: MAT_DATE_FORMATS, useValue: { parse: { dateInput: 'input' } } },
  ],
})
export class DashboardModule { }
