import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserComponent } from './admin-user.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule, NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { PaginatorModule } from 'primeng/paginator';
import { AddEditAdminComponent } from './add-edit-admin/add-edit-admin.component';
import { InputSwitchModule } from 'primeng/inputswitch';

const routes: Routes = [
  {
    path: '',
    component: AdminUserComponent,
  },
  {
    path: ':id',
    component: AddEditAdminComponent,
  }
]

@NgModule({
  declarations: [
    AdminUserComponent,
    AddEditAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    PaginatorModule,
    // ButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    NgxIntlTelInputModule,
    MatDatepickerModule,
    NativeDateModule,
    InputSwitchModule
  ]
})
export class AdminUserModule { }
