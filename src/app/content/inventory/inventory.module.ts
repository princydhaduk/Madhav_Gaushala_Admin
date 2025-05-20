import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { RouterModule, Routes } from '@angular/router';
import { AddEditInventoryComponent } from './add-edit-inventory/add-edit-inventory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PaginatorModule } from 'primeng/paginator';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
  },
]

@NgModule({
  declarations: [
    InventoryComponent,
    AddEditInventoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    PaginatorModule,
    MatTableModule, 
  ]
})
export class InventoryModule { }
