import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalRecordsComponent } from './medical-records.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MedicalRecordsComponent,
  },
]

@NgModule({
  declarations: [
    MedicalRecordsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MedicalRecordsModule { }
