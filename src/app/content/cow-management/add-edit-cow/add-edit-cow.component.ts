import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-cow',
  templateUrl: './add-edit-cow.component.html',
  styleUrls: ['./add-edit-cow.component.scss']
})
export class AddEditCowComponent implements OnInit {

  cowDataForm: any = FormGroup;
  constructor(
    private matDialogRef: MatDialogRef<AddEditCowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.cowDataForm = this._fb.group({
      cowPhoto: [''],
      cowName: ['', Validators.required],
      cowType: ['', Validators.required],
      healthStatus: ['', Validators.required],
      descripation: ['', Validators.required],
    });
  }

  
  onSubmit() {
    
  }

  close() {
    this.matDialogRef.close();
  }
}
