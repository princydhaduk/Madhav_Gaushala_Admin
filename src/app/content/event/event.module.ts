import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event.component';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';



@NgModule({
  declarations: [
    EventComponent,
    AddEditEventComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EventModule { }
