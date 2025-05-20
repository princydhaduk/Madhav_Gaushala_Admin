import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalRecordsComponent } from './medical-records.component';
import { RouterModule, Routes } from '@angular/router';
import { AddEditMedicalComponent } from './add-edit-medical/add-edit-medical.component';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule, NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ImageModule } from 'primeng/image';
import { InputSwitchModule } from 'primeng/inputswitch';

const routes: Routes = [
  {
    path: '',
    component: MedicalRecordsComponent,
  },
]

@NgModule({
  declarations: [
    MedicalRecordsComponent,
    AddEditMedicalComponent
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

  ]
})
export class MedicalRecordsModule { }
