import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-expense',
  templateUrl: './add-edit-expense.component.html',
  styleUrls: ['./add-edit-expense.component.scss']
})
export class AddEditExpenseComponent implements OnInit{

  constructor(
     private matDialogRef: MatDialogRef<AddEditExpenseComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    
  }

  close(){
    this.matDialogRef.close();
  }
}
