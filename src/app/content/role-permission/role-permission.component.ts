import { Component, ViewChild } from '@angular/core';
import { CommonModalComponent } from '../../common-modal/common-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { CONSTANTS } from '../../common/constants';
import { MatSort } from '@angular/material/sort';
import { GlobalFunctions } from '../../common/global-function';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { RolePermissionService } from './role-permission.service';
import { checkPermission } from '../../common/checkPermission';
import { ToastrService } from 'ngx-toastr';

export interface roleElement {
  id: any;
  role: any;
  createdBy: any;
  createdAt: any;
  updatedBy: any;
  updatedAt: any;
  status: any;
  action: any;
}

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  //styleUrls: [: './role-permission.component.scss'
})

export class RolePermissionComponent {

  isTableLoading: boolean = false;
  ROLE_DATA: roleElement[] = [];
  totalRole: any;
  searchCoupon: any;
  displayedColumns: string[] = ['id', 'role', 'createdBy', 'createdAt', 'updatedBy', 'updatedAt', 'status', 'action'];
  roleData = new MatTableDataSource<roleElement>(this.ROLE_DATA);
  selection = new SelectionModel<roleElement>(true, []);
  name: string = '';
  constants: any = CONSTANTS;
  selCouponValidityStatus: any = "Active";
  selCouponStatus: any = "";
  startDate: any;
  endDate: any;
  pageNo: any;
  limit: any;
  @ViewChild(MatSort, { static: false }) couponSort!: MatSort;
  @ViewChild('paginator', { static: true }) paginator!: Paginator

  constructor(
    private _globalFunctions: GlobalFunctions,
    private _roleService: RolePermissionService,
    private _router: Router,
    private dialog: MatDialog,
    private _checkPer: checkPermission,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAllRoleList();
  }

  ngAfterViewInit() {
    this.roleData.sort = this.couponSort;
  }

  onKeySearch(event: any) {
    this.searchCoupon = event?.target?.value;
    this.getAllRoleList();
  }

  // filterData() {
  //   $('.mat-mdc-select-panel.mdc-menu-surface.mdc-menu-surface--open').click(function () {
  //     $('.mat-focused').removeClass('mat-focused')
  //   })
  //   this.getAllRoleList();
  // }

  getAllRoleList(event: any = '') {
    this.isTableLoading = true;
    if (!this._checkPer.checkPermissionByPage("Create Roles", "view")) {
      this.toastr.clear();
      this.toastr.error("Access to the requested resource is forbidden! Contact Administrator. ", 'Oops...');
      this.isTableLoading = false;
      return;
    }
    this.pageNo = event ? (event.page + 1) : 1;
    this.limit = event.rows || 10;
    let filter = {
      page: this.pageNo || '1',
      limit: this.limit || '10',
      search: this.searchCoupon || ''
    }
    this._roleService.getRoleListWithPagination(filter).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.totalRole = result?.Data?.totalDocs;
        this.ROLE_DATA = result.Data.docs;
        this.roleData = new MatTableDataSource<roleElement>(this.ROLE_DATA);
        this.roleData.sort = this.couponSort;
        this.isTableLoading = false;
      } else {
        this.isTableLoading = false;
        this._globalFunctions.successErrorHandling(result, this, true)
      }
    }, (error: any) => {
      this.isTableLoading = false;
      this._globalFunctions.errorHanding(error, this, true);
    });
  }

  addEditRole(resData: any) {
    if (!this._checkPer.checkPermissionByPage("Create Roles", "insert") && !this._checkPer.checkPermissionByPage("Create Roles", "update")) {
      this.toastr.clear();
      this.toastr.error("Access to the requested resource is forbidden! Contact Administrator. ", 'Oops...');
      this.isTableLoading = false;
      return;
    }
    this._router.navigate(['/role-permission/', resData ? resData : 'asginpermission']);
  }

  changeStatusAction(e: any, resData: any) {
    // e.stopPropagation();
    this.isTableLoading = true;
    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '410px',
      data: {
        title: "Confirmation",
        message: "Are you sure you want to change the Status?",
        buttonNames: [{ firstBtn: "Update", secondBtn: "Cancel" }]
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let param = {
          rolesid: resData.id
        }
        this._roleService.changeRoleStatus(param).subscribe((result: any) => {
          if (result && result.IsSuccess) {
            this.toastr.clear();
            this.toastr.success(result?.Message || "Status Updated successfully.", "Success");
            this.getAllRoleList();
            this.isTableLoading = false;
          } else {
            this.getAllRoleList();
            this.isTableLoading = false;
            this._globalFunctions.successErrorHandling(result, this, true);
          }
        }, (error: any) => {
          this.getAllRoleList();
          this.isTableLoading = false;
          this._globalFunctions.errorHanding(error, this, true);
        });
      } else {
        this.getAllRoleList();
        this.isTableLoading = false;
      }
    });
  }

  deleteRole(element: any) {
    this.isTableLoading = true;
    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '410px',
      height: 'fit-content',
      data: {
        title: 'Confirmation!',
        message: 'Are you sure you want to delete this data ?',
        buttonNames: [{ firstBtn: "Delete", secondBtn: 'Cancel' }]
      }
    });
    
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let param = {
          rolesid: element,
        }
        this._roleService.removeRole(param).subscribe((result: any) => {
          if (result && result.IsSuccess) {
            this.toastr.clear();
            this.toastr.success(result?.Message || "Data deleted successfully.", "Success");
            this.getAllRoleList();
            this.isTableLoading = false;
          } else {
            this.getAllRoleList();
            this.isTableLoading = false;
            this._globalFunctions.successErrorHandling(result, this, true);
          }
        }, (error: any) => {
          this.getAllRoleList();
          this.isTableLoading = false;
          this._globalFunctions.errorHanding(error, this, true)
        })
      } else {
        this.getAllRoleList();
      }
      this.isTableLoading = false;
    });
  }

}
