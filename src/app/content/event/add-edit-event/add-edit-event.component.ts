import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators } from 'ngx-editor';
import { AddEditMedicalComponent } from '../../medical-records/add-edit-medical/add-edit-medical.component';

@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.scss']
})
export class AddEditEventComponent {
  eventDataForm: any = FormGroup;
    constructor(
      private matDialogRef: MatDialogRef<AddEditMedicalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
      this.eventDataForm = this._fb.group({
        // cowPhoto: [''],
        eventTitle: ['', Validators.required],
        description: ['', Validators.required],
        date: ['', Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
        unit: ['', Validators.required],
        location: ['', Validators.required],


      });
  }


  onSubmit() {
  }
  
  close() {
    this.matDialogRef.close();
  }
}
