import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-common-modal',
  templateUrl: './common-modal.component.html',
  // styleUrlss: ['./common-modal.component.scss']
})
export class CommonModalComponent {
  title: string = "";
  message: string = "";
  btnList: any = [];

  constructor(public dialogRef: MatDialogRef<CommonModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.title = this.data?.title;
    this.message = this.data?.message;
    this.btnList = this.data?.buttonNames
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
