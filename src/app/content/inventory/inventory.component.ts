import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paginator } from 'primeng/paginator';
import { GlobalFunctions } from 'src/app/common/global-function';
import { adminElement } from '../cow-management/cow-management.component';
import { SelectionModel } from '@angular/cdk/collections';
import { AddEditInventoryComponent } from './add-edit-inventory/add-edit-inventory.component';
import { CommonModalComponent } from 'src/app/common-modal/common-modal.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
 
   isTableLoading: boolean = false;
   INVENTORY_DATA: adminElement[] = [];
   displayedColumns: string[] = ['item_name', 'category', 'quantity', 'unit', 'status'];
   inventoryData = new MatTableDataSource<adminElement>(this.INVENTORY_DATA);
   selection = new SelectionModel<adminElement>(true, []);
   pageNo: any = 1;
   limit: any = 10;
   totaladminData: any;
   searchAdmin: any;
   @ViewChild(MatSort, { static: false }) adminSort!: MatSort;
   @ViewChild('paginator', { static: true }) paginator!: Paginator
 
   constructor(
     private _router: Router,
     private dialog: MatDialog,
    //  private _cowService: CowManagementService,
     private _globalFunctions: GlobalFunctions,
     private toastr: ToastrService
   ) { }
 
   ngOnInit(): void {
     this.getAdminList();
   }
 
   onKeySearch(event: any) {
     this.searchAdmin = event.target.value;
     this.getAdminList();
   }
 
   getAdminList(event: any = '') {
     this.pageNo = event ? (event.page + 1) : 1;
     this.limit = event.rows || 10;
     let filter = {
       page: this.pageNo || '1',
       limit: this.limit || '10',
       search: this.searchAdmin,
       pagination: true,
     };
 
    //  this._cowService.adminListWP(filter).subscribe((result: any) => {
    //    if (result && result.IsSuccess) {
    //      this.totaladminData = result.Data.totalDocs;
    //      this.ADMIN_DATA = result.Data.docs;
    //      this.adminData = new MatTableDataSource<adminElement>(this.ADMIN_DATA);
    //      this.adminData.sort = this.adminSort;
    //      this.isTableLoading = false;
    //    } else {
    //      this.isTableLoading = false;
    //      this._globalFunctions.successErrorHandling(result, this, true);
    //    }
    //  }, (error: any) => {
    //    this.isTableLoading = false;
    //    this._globalFunctions.errorHanding(error, this, true);
    //  });
   }
 
   addProduct() {
     // this._router.navigate(['admin-user/', 'adminuserId']);
       const dialogRef = this.dialog.open(AddEditInventoryComponent, {
       width: '700px',
       data: [{ result: null },
       { btnName: "Add" }
       ],
       disableClose: true
     });
     dialogRef.afterClosed().subscribe((res) => {
       this.getAdminList();
     });
   }
 
    editAdmin(resData: any) {
       const dialogRef = this.dialog.open(AddEditInventoryComponent, {
       width: '700px',
       data: [{ result: resData },
       { btnName: "Add" }
       ],
       disableClose: true
     });
     dialogRef.afterClosed().subscribe((res) => {
       this.getAdminList();
     });
   }
 
   // editAdmin(event: any, resData: any) {
   //   //  event.stopPropagation();
   //   this._router.navigate(['admin-user/', resData?.id]);
   // }
 
   statusChangeAdmin(resData: any) {
     const dialogRef = this.dialog.open(CommonModalComponent, {
       width: '530px',
       data: {
         title: 'Conformation',
         message: 'Are You Sure You Want To Change the Staus? ',
         buttonNames: [{ firstBtn: "Update", secondBtn: 'Cancle' }]
       }
     });
     dialogRef.afterClosed().subscribe((res) => {
       if (res) {
         let param = {
           adminuserid: resData?._id,
         }
        //  this._cowService.adminChangeStatus(param).subscribe((result: any) => {
        //    if (result && result.IsSuccess) {
        //      this.toastr.clear();
        //      this.toastr.success(result.Message, "Success");
        //      this.getAdminList();
        //      this.isTableLoading = false;
        //    } else {
        //      this.getAdminList();
        //      this.isTableLoading = false;
        //      this._globalFunctions.successErrorHandling(result, this, true);
        //    }
        //  }, (error: any) => {
        //    this.getAdminList();
        //    this.isTableLoading = false;
        //    this._globalFunctions.errorHanding(error, this, true)
        //  })
       }
       else {
         this.getAdminList();
         this.isTableLoading = false;
       }
     });
   }
 
   deleteAdmin(resData: any) {
     const dialogRef = this.dialog.open(CommonModalComponent, {
       width: '530px',
       data: {
         title: 'Conformation',
         message: 'Are You Sure You Want To Delete Admin? ',
         buttonNames: [{ firstBtn: "Delete", secondBtn: 'Cancle' }]
       }
     });
     dialogRef.afterClosed().subscribe((res) => {
       this.getAdminList();
 
     })
   }
}
