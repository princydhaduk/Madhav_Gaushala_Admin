import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-medical',
  templateUrl: './add-edit-medical.component.html',
  styleUrls: ['./add-edit-medical.component.scss']
})
export class AddEditMedicalComponent {

  medicalDataForm: any = FormGroup;
    constructor(
      private matDialogRef: MatDialogRef<AddEditMedicalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
      this.medicalDataForm = this._fb.group({
        // cowPhoto: [''],
        cowIdName: ['', Validators.required],
        dateCheckup: ['', Validators.required],
        healthIssue: ['', Validators.required],
        description: ['', Validators.required],
      });
  }


  onSubmit() {
  }
  
  close() {
    this.matDialogRef.close();
  }
}
