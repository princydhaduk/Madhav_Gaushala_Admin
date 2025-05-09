import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { GlobalFunctions } from './../../common/global-function';
import { CommonModalComponent } from '../../common-modal/common-modal.component';
import { RoomService } from './room.service';

export interface RoomsElement {
  room_name: any;
  no_of_adults: any;
  no_of_child: any;
  room_size: any;
  bed_type: any;
  price: any;
  gst: any;
  pricewithgst: any;
  extra_price: any;
  extra_gst: any;
  extra_pricewithgst: any;
  breakfast_price: any;
  breakfast_gst: any;
  breakfast_pricewithgst: any;
  amenities_names: any;
  status: boolean;
  action: any;
}


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  //styleUrls: [: './room.component.scss'
})
export class RoomComponent {
 isTableLoading: boolean = false;
   ROOMS_DATA: RoomsElement[] = [];
   totalRooms: any;
   searchRooms: any = "";
   displayedColumns: string[] = ['room_name','no_of_adults','no_of_child','room_size','bed_type','price','gst','pricewithgst','extra_price','extra_gst','extra_pricewithgst','breakfast_price','breakfast_gst','breakfast_pricewithgst','amenities_names','status','action'];
   roomsData = new MatTableDataSource<RoomsElement>(this.ROOMS_DATA);
   selection = new SelectionModel<RoomsElement>(true, []);
   name: string = "";
   @ViewChild(MatSort, { static: false }) roomsSort!: MatSort;
   pageNo: any;
   limit: any;
   selStatus: any = "";
   selRoomType: any = "";
   roomTypeList:any;
 
   constructor(
     private _router: Router,
     private _globalFunctions: GlobalFunctions,
     private _toastr: ToastrService,
     private _roomService: RoomService,
     private dialog: MatDialog
   ) { }
 
   ngOnInit() {
    //this.getRoomTypeList();
     this.getRoomsList();
     this.roomsData.sort = this.roomsSort;
   }
 
   ngAfterViewInit() {
    this.roomsData.sort = this.roomsSort;
   }
 
   onKeySearch(event: any) { // without type info
     this.searchRooms = event.target.value;
     this.getRoomsList();
   }
 
   filterData() {
     this.getRoomsList();
   }

  getRoomTypeList() {
    // this._roomTypeService.getRoomTypeWithoutPagination().subscribe((result: any) => {
    //   if (result && result.IsSuccess) {
    //     this.roomTypeList = result?.Data;
    //     this.isTableLoading = false;
    //   } else {
    //     this.isTableLoading = false;
    //     this._globalFunctions.successErrorHandling(result, this, true);
    //   }
    // }, (error: any) => {
    //   this.isTableLoading = false;
    //   this._globalFunctions.errorHanding(error, this, true);
    // });
  }

  getRoomsList(event: any = ''): void {
    this.isTableLoading = true;
    this.pageNo = event ? (event.page + 1) : 1;
    this.limit = event.rows || 10;
    let filter = {
      page: this.pageNo || '1',
      limit: this.limit || '10',
      search: this.searchRooms || "",
      status: this.selStatus,
      // room_type: this.selRoomType || "",
    };

    this._roomService.getRoomsWithPagination(filter).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.totalRooms = result.Data.totalDocs;
        result.Data.docs.map((doc: any) => {
          // Get comma-separated amenity names
          const amenitiesNames = doc.amenities
            .map((amenity: any) => amenity.amenityid.amenityname)
            .join(", ");

          doc.amenities_names = amenitiesNames;
        });
        this.ROOMS_DATA = result.Data.docs;
        this.roomsData = new MatTableDataSource<RoomsElement>(this.ROOMS_DATA);
        this.roomsData.sort = this.roomsSort;
        this.isTableLoading = false;
      } else {
        this.isTableLoading = false;
        this._globalFunctions.successErrorHandling(result, this, true);
      }
    }, (error: any) => {
      this.isTableLoading = false;
      this._globalFunctions.errorHanding(error, this, true);
    });
  }

  addEditRooms(id: any = "") {
    this._router.navigate(['rooms/', id ? id : 'roomsdetails']);
  }

  changeStatusAction(e: any, resData: any) {
    //e.stopPropagation();
    this.isTableLoading = true;
    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '600px',
      data: {
        title: "Confirmation",
        message: "Are you sure you want to change the Status?",
        buttonNames: [{ firstBtn: "Update", secondBtn: "Cancel" }]
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let param = {
          roomid: resData.id
        }
        this._roomService.changeStatus(param).subscribe((result: any) => {
          if (result && result.IsSuccess) {
            this._toastr.clear();
            this._toastr.success(result?.Message || "Status Updated successfully.", "Success");
            this.getRoomsList();
            this.isTableLoading = false;
          } else {
            this.getRoomsList();
            this.isTableLoading = false;
            this._globalFunctions.successErrorHandling(result, this, true);
          }
        }, (error: any) => {
          this.getRoomsList();
          this.isTableLoading = false;
          this._globalFunctions.errorHanding(error, this, true);
        });
      } else {
        this.getRoomsList();
        this.isTableLoading = false;
      }
    });
  }

  deleteRooms(e: any, resData: any) {
    //e.stopPropagation();
    this.isTableLoading = true;
    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '600px',
      data: {
        title: "Confirmation",
        message: "Are you sure you want to delete this data ?",
        buttonNames: [{ firstBtn: "Delete", secondBtn: "Cancel" }]
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let param = {
          roomid: resData.id
        }
        this._roomService.removeRooms(param).subscribe((result: any) => {
          if (result && result.IsSuccess) {
            this._toastr.clear();
            this._toastr.success(result?.Message || "Room deleted successfully.", "Success");
            this.getRoomsList();
            this.isTableLoading = false;
          } else {
            this.getRoomsList();
            this.isTableLoading = false;
            this._globalFunctions.successErrorHandling(result, this, true);
          }
        }, (error: any) => {
          this.getRoomsList();
          this.isTableLoading = false;
          this._globalFunctions.errorHanding(error, this, true);
        });
      } else {
        this.getRoomsList();
        this.isTableLoading = false;
      }
    });
  }
}