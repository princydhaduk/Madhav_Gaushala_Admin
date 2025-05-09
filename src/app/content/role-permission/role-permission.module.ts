import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolePermissionComponent } from './role-permission.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule, NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PaginatorModule } from 'primeng/paginator';
import { AssignPermissionComponent } from './assign-permission/assign-permission.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

const routes: Routes = [
  {
    path: '',
    component: RolePermissionComponent,
  },
  {
    path: ':id',
    component: AssignPermissionComponent,
  }
]

@NgModule({
  declarations: [
    RolePermissionComponent,
    AssignPermissionComponent
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
    InputSwitchModule,
    MatCheckboxModule,
  ]
})
export class RolePermissionModule { }
