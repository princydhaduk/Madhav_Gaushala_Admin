import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CowManagementComponent } from './cow-management.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, NativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AddEditCowComponent } from './add-edit-cow/add-edit-cow.component';
import { ImageModule } from 'primeng/image';

const routes: Routes = [
  {
    path: '',
    component: CowManagementComponent,
  },
]

@NgModule({
  declarations: [
    CowManagementComponent,
    AddEditCowComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatDatepickerModule,
    NativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    InputSwitchModule,
    ImageModule
  ]
})
export class CowManagementModule { }
