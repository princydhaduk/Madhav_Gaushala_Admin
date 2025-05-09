import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reports-filter',
  templateUrl: './reports-filter.component.html',
  //styleUrls: [: './reports-filter.component.scss'
})
export class ReportsFilterComponent {

  constructor(
    private matDialogRef:MatDialogRef<ReportsFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  closeDialog(){
    this.matDialogRef.close();
  }
}
