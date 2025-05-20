import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { RouterModule, Routes } from '@angular/router';
import { AddEditInventoryComponent } from './add-edit-inventory/add-edit-inventory.component';

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
  ]
})
export class InventoryModule { }
