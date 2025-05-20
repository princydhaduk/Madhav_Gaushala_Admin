import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paginator } from 'primeng/paginator';
import { CommonModalComponent } from 'src/app/common-modal/common-modal.component';
import { GlobalFunctions } from 'src/app/common/global-function';
import { AddEditMedicalComponent } from '../medical-records/add-edit-medical/add-edit-medical.component';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';


export interface eventElement {
  cow_id: any;
  record_type: any;
  date: any;
  veterinarian: any;
  status: boolean;
  action: any;
}
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
 isTableLoading: boolean = false;
   EVENT_DATA: eventElement[] = [];
   displayedColumns: string[] = ['cow_id', 'record_type', 'date', 'veterinarian', 'status', 'action'];
   eventData = new MatTableDataSource<eventElement>(this.EVENT_DATA);
   selection = new SelectionModel<eventElement>(true, []);
   pageNo: any = 1;
   limit: any = 10;
   totaleventData: any;
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
    //      this.totaleventData = result.Data.totalDocs;
    //      this.EVENT_DATA = result.Data.docs;
    //      this.eventData = new MatTableDataSource<eventElement>(this.EVENT_DATA);
    //      this.eventData.sort = this.adminSort;
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
 
   addAdmin() {
     // this._router.navigate(['admin-user/', 'adminuserId']);
       const dialogRef = this.dialog.open(AddEditEventComponent, {
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
       const dialogRef = this.dialog.open(AddEditEventComponent, {
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
