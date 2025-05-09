import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room.component';
import { RouterModule, Routes } from '@angular/router';
import { AddEditRoomComponent } from './add-edit-room/add-edit-room.component';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxEditorModule } from 'ngx-editor';

const routes: Routes = [
  {
    path: '',
    component: RoomComponent,
  },
  {
    path: ':id',
    component: AddEditRoomComponent,
  }
]

@NgModule({
  declarations: [
    RoomComponent,
    AddEditRoomComponent
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
     NgxEditorModule,
     MatCheckboxModule,
     MatSelectModule
  ]
})
export class RoomModule { }
