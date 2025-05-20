import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-expense',
  templateUrl: './add-edit-expense.component.html',
  styleUrls: ['./add-edit-expense.component.scss']
})
export class AddEditExpenseComponent implements OnInit{

  expenseDataForm: any = FormGroup;
    constructor(
      private matDialogRef: MatDialogRef<AddEditExpenseComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
      this.expenseDataForm = this._fb.group({
        // cowPhoto: [''],
        expenseTitle: ['', Validators.required],
        expenseCategory: ['', Validators.required],
        paymentMethod: ['', Validators.required],
        paymentDate: ['', Validators.required],
        amount: ['', Validators.required],
        description: ['', Validators.required],
      });
  }

  onSubmit() {
  }
  
  close() {
    this.matDialogRef.close();
  }
}
