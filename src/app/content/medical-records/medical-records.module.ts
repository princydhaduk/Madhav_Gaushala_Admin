import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalRecordsComponent } from './medical-records.component';
import { RouterModule, Routes } from '@angular/router';
import { AddEditMedicalComponent } from './add-edit-medical/add-edit-medical.component';

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
  ]
})
export class MedicalRecordsModule { }
