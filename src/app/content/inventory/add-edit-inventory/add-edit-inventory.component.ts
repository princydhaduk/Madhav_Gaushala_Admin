import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-inventory',
  templateUrl: './add-edit-inventory.component.html',
  styleUrls: ['./add-edit-inventory.component.scss']
})
export class AddEditInventoryComponent implements OnInit{

  inventoryDataForm: any = FormGroup;
  constructor(
     private matDialogRef: MatDialogRef<AddEditInventoryComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private _fb: FormBuilder
   ) { }

   ngOnInit(): void {
     this.initForm();
   }

    initForm() {
       this.inventoryDataForm = this._fb.group({
         itemName: ['', Validators.required],
         itemCategory: ['', Validators.required],
         quantity: ['', Validators.required],
         unit: ['', Validators.required],
         date: ['', Validators.required],
         supplierName: ['', Validators.required],
         status: ['', Validators.required],
         


       });
     }

  onSubmit() {
  }

  close() {
    this.matDialogRef.close();
  }
}
