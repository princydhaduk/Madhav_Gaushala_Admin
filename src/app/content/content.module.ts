import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
// import { NgImageSliderModule, NgImageSliderService } from 'ng-image-slider';
import { NgChartsModule } from 'ng2-charts';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ContentComponent } from './content.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'dashboard'
  },
  {
    path:'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m=>m.DashboardModule),
    data: { title: 'Dashboard' }
  },
  {
    path:'cow-management',
    loadChildren: () => import('./cow-management/cow-management.module').then(m=>m.CowManagementModule),
    data: { title: 'Cow Management' }
  },
  {
    path:'donation',
    loadChildren: () => import('./donation/donation.module').then(m=>m.DonationModule),
    data: { title: 'Donation' }
  },
  {
    path:'expenses',
    loadChildren: () => import('./expenses/expenses.module').then(m=>m.ExpensesModule),
    data: { title: 'Expenses' }
  },
  {
    path:'staff',
    loadChildren: () => import('./staff/staff.module').then(m=>m.StaffModule),
    data: { title: 'Staff' }
  },
  {
    path:'inventory',
    loadChildren: () => import('./inventory/inventory.module').then(m=>m.InventoryModule),
    data: { title: 'Inventory' }
  },
  {
    path:'medical-records',
    loadChildren: () => import('./medical-records/medical-records.module').then(m=>m.MedicalRecordsModule),
    data: { title: 'Medical Records' }
  },
  {
    path:'event',
    loadChildren: () => import('./event/event.module').then(m=>m.EventModule),
    data: { title: 'Events' }
  },
  {
    path:'rooms',
    loadChildren: () => import('./room/room.module').then(m=>m.RoomModule),
    data: { title: 'Rooms' }
  },
  {
    path:'settings',
    loadChildren: () => import('./setting/setting.module').then(m=>m.SettingModule),
    data: { title: 'Settings' }
  },
  {
    path:'admin-user',
    loadChildren: () => import('./admin-user/admin-user.module').then(m=>m.AdminUserModule),
    data: { title: 'Create Admin' }
  },
  {
    path:'**',
    pathMatch:'full',
    redirectTo:'dashboard'
  },
 
];

@NgModule({
  declarations: [
    ContentComponent,
    CalculatorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    DropdownModule,
    FormsModule,
    InputSwitchModule,
    MatSortModule,
    ReactiveFormsModule,
    InputTextareaModule ,
    InputTextModule,
    PaginatorModule,
    ColorPickerModule,
    ImageModule,
    RadioButtonModule ,
    NgChartsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers:[] //NgImageSliderService
})
export class ContentModule { }
