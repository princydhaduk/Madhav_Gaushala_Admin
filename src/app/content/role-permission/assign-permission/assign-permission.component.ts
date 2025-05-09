import { Component, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalFunctions } from '../../../common/global-function';
import { RolePermissionService } from '../role-permission.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModalComponent } from '../../../common-modal/common-modal.component';
import { checkPermission } from '../../../common/checkPermission';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assign-permission',
  templateUrl: './assign-permission.component.html',
  //styleUrls: [: './assign-permission.component.scss'
})
export class AssignPermissionComponent {
  roleId: any;
  select_all: any;
  roleForm: any = FormGroup;
  roleDetails:any;
  isPermissionsShow: boolean = false;
  isRoleAvailable: boolean = false;
  pageType: any = 'Add';
  isLoading: boolean = false;
  allRoleByIdData: any = [];
  roleByIdData: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _globalFunctions: GlobalFunctions,
    private _rolePermissionService: RolePermissionService,
    private router: Router,
    private elementRef: ElementRef,
    private fb: FormBuilder,
    private dialog:MatDialog, 
    private _checkPer: checkPermission,
    private toastr:ToastrService
  ){}

  ngOnInit(): void {
    this.init();
    this.roleId = this._activatedRoute.snapshot.paramMap.get('id');
    if (this.roleId && this.roleId != "asginpermission") {
      this.pageType = 'Edit'
      this.getRoleById();
      // this.SocketioService.listenEventOrChannelId(window.atob(localStorage.getItem("chID")!) || '' ).subscribe((data) => {
      //   if (data.event == "onrolesave") {
      //     this.getRoleById();
      //   }      
      // });
    } else {
      this.getDefaultRole();
    }
    
  }
  
  init(): void {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required]],
      permissions: this.fb.array([])
    });
    this.roleDetails = this.roleForm.get('permissions') as FormArray;
  }

  createRoles(tempObj: any = []) {
    return this.fb.group({
      selectAll: [tempObj.selectAll || false],
      view: [tempObj.view || false],
      insert: [tempObj.insert || false],
      update: [tempObj.update || false],
      delete: [tempObj.delete || false],
      displayname: [tempObj.displayname || ""],
      collectionName: [tempObj.collectionName || ""],
    })
  }

  get permissionsFormGroup() {
    return this.roleForm.get('permissions') as FormArray;
  }

  checkAllRolesList(event:any){
    this.select_all = event.checked;
    let type = event.checked ? "enable" : "disable";
    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '410px',
      height:'fit-content',
      data: {
        title: "Confirmation",
        message: "Are you sure you want to " + type + " all permissions?",
        buttonNames: [{ firstBtn: "Yes", secondBtn: "No" }]
      }
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        for (let i = 0; i < this.permissionsFormGroup.controls.length; i++) {
          this.roleForm.get('permissions').controls[i].get('view').setValue(event.checked);
          this.roleForm.get('permissions').controls[i].get('delete').setValue(event.checked);
          this.roleForm.get('permissions').controls[i].get('insert').setValue(event.checked);
          this.roleForm.get('permissions').controls[i].get('update').setValue(event.checked);
          this.roleForm.get('permissions').controls[i].get('selectAll').setValue(event.checked);
        }
      } else {
        this.select_all = !event.checked;
      }
    });
  }

  
  checkAllRole(event: any, index: any) {
    this.roleForm.get('permissions').controls[index].get('view').setValue(event);
    this.roleForm.get('permissions').controls[index].get('delete').setValue(event);
    this.roleForm.get('permissions').controls[index].get('insert').setValue(event);
    this.roleForm.get('permissions').controls[index].get('update').setValue(event);
  }

  unCheckSelectAllRole(event:any, index:any){

  }

  getRoleById(){
    this.isLoading = true;
    if (!this._checkPer.checkPermissionByPage("Create Roles", "view")) {
      this.toastr.clear();
      this.toastr.error("Access to the requested resource is forbidden! Contact Administrator. ", 'Oops...');
      this.isLoading = false;
      return;
    }
    let param = {
      rolesid: this.roleId
    }

    this._rolePermissionService.getRoleById(param).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        [result.Data].map((i: any) => {
          if (i.permissions && i.permissions.length > 0) {
            i.permissions.map((k: any) => {
              k.selectAll = false;
            });
          }
        });

        this.allRoleByIdData = result.Data;
        this.roleByIdData = result.Data;
        this.setRole(this.roleByIdData);
        this.isPermissionsShow = true;
        this.generateRolesModules(this.pageType);
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this._globalFunctions.successErrorHandling(result, this, true);
      }
    }, (error: any) => {
      this.isLoading = false;
      this._globalFunctions.errorHanding(error, this, true);
    });
  }

  getDefaultRole(){
    this.isLoading = true;
    if (!this._checkPer.checkPermissionByPage("Create Roles", "view")) {
      this.toastr.clear();
      this.toastr.error("Access to the requested resource is forbidden! Contact Administrator. ", 'Oops...');
      this.isLoading = false;
      return;
    }
    this._rolePermissionService.getDefaultRole().subscribe((result: any) => {
      if (result && result.IsSuccess) {
          [result.Data].map((i: any) => {
            if (i && i.length > 0) {
              i.map((k: any) => {
                k.selectAll = false;
              });
            }
          });

        this.allRoleByIdData = result.Data;
        this.roleByIdData = result.Data;
        this.isPermissionsShow = true;
        this.generateRolesModules(this.pageType);
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this._globalFunctions.successErrorHandling(result, this, true);
      }
    }, (error: any) => {
      this.isLoading = false;
      this._globalFunctions.errorHanding(error, this, true);
    });
  }

  setRole(data: any = []) {
    this.roleForm.get('name').setValue(data.name);
    // this.roleForm.get('status').setValue(data.status);
  }

  // generateRolesModules(pageType:any) {
  //   const control = <FormArray>this.roleForm.controls['permissions'];
  //   for (let i = control.length - 1; i >= 0; i--) {
  //     control.removeAt(i)
  //   }

  //   if (this.roleByIdData) {
  //     if (this.roleByIdData?.length > 0 && pageType=="Add") {
  //       this.roleByIdData.map((item: any) => {
  //         this.isRoleAvailable = true;
  //         if (item.view && item.delete && item.insertUpdate) {
  //           item.selectAll = true
  //         }
  //         this.roleDetails.push(this.createRoles(item));
  //       });
  //     }
  //     else if (this.roleByIdData?.permissions?.length > 0 && pageType=="Edit") {
  //       this.roleByIdData.permissions.map((item: any) => {
  //         this.isRoleAvailable = true;
  //         if (item.view && item.delete && item.insertUpdate) {
  //           item.selectAll = true
  //         }
  //         this.roleDetails.push(this.createRoles(item));
  //       });
  //     }
  //     else {
  //       this.isRoleAvailable = false;
  //     }
  //   }
  // } 

  generateRolesModules(pageType: any) {
    const permissionsArray = this.roleForm.get('permissions') as FormArray;
    
    // Clear existing FormArray before adding new data
    while (permissionsArray.length !== 0) {
      permissionsArray.removeAt(0);
    }
  
    if (this.roleByIdData) {
      let permissionsData = pageType === "Edit" ? this.roleByIdData.permissions : this.roleByIdData;
  
      if (permissionsData && Array.isArray(permissionsData) && permissionsData.length > 0) {
        this.isRoleAvailable = true;
        
        permissionsData.forEach((item: any) => {
          // Ensure the selectAll property is set
          item.selectAll = !!(item.view && item.delete && item.insert && item.update);
  
          // Push new roles into the FormArray
          permissionsArray.push(this.createRoles(item));
        });
  
      } else {
        this.isRoleAvailable = false;
      }
    }
  }
  

  onSubmitAction(){
    this.isLoading = true;
    if (!this._checkPer.checkPermissionByPage("Create Roles", "insert") && !this._checkPer.checkPermissionByPage("Role & Permissions", "update")) {
      this.toastr.clear();
      this.toastr.error("Access to the requested resource is forbidden! Contact Administrator. ", 'Oops...');
      this.isLoading = false;
      return;
    }

    if (!this.roleForm.valid) {
      this.toastr.clear();
      this.toastr.error("Please enter valid data. ", 'Oops...');
      this.isLoading = false;
      return;
    }

    let roleDataObj: any = {
      roleid: this.roleId && this.roleId != "asginpermission" ? this.roleId : "",
      name: this.roleForm.value.name,
      permissions: {}
    };

    this.roleForm.value.permissions.map((i: any) => {
      delete i.selectAll;
    });
    roleDataObj.permissions = this.roleForm.value.permissions;

    this.roleForm.disable();
    this._rolePermissionService.addEditRoles(roleDataObj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.toastr.clear();
        this.toastr.success(result.Message, 'Success');
        this.router.navigate(['/role-permission']);
        this.isLoading = false;
      } else {
        this.roleForm.enable();
        this.isLoading = false;
        this._globalFunctions.successErrorHandling(result, this, true);
      }
    }, (error: any) => {
      this.roleForm.enable();
      this.isLoading = false;
      this._globalFunctions.errorHanding(error, this, true);
    });
  }
}
