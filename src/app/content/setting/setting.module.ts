import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { NgxEditorModule } from 'ngx-editor';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
  },
]

@NgModule({
  declarations: [
    SettingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InputSwitchModule,
    InputTextModule,
    NgxEditorModule,
    NgxIntlTelInputModule,
  ]
})
export class SettingModule { }
