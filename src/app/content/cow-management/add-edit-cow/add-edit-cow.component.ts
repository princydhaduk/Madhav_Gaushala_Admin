import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-cow',
  templateUrl: './add-edit-cow.component.html',
  styleUrls: ['./add-edit-cow.component.scss']
})
export class AddEditCowComponent implements OnInit {

  cowDataForm: any = FormGroup;
  constructor(
    private matDialogRef: MatDialogRef<AddEditCowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    //  this.userId = this._activatedRoute.snapshot.paramMap.get('id');
    // if (this.userId && this.userId != "adminuserId") {
    //   this.pageType = "Edit";
    //   let param = {
    //     adminuserid: this.userId
    //   }
    //   this._adminService.adminGetOne(param).subscribe((result: any) => {
    //     if (result && result.IsSuccess) {
    //       this.setUserData(result?.Data);
    //     } else {
    //       this._globalFunctions.successErrorHandling(result, this, true);
    //     }
    //   }, (error: any) => {
    //     this._globalFunctions.errorHanding(error, this, true);
    //   });
    // }
  }

  initForm() {
    this.cowDataForm = this._fb.group({
      cowPhoto: [''],
      cowName: ['', Validators.required],
      cowType: ['', Validators.required],
      healthStatus: ['', Validators.required],
      descripation: ['', Validators.required],
    });
  }

   uploadItemImage(event: any): void {
    // if (event.target.files && event.target.files[0]) {
    //   const file = event.target.files[0];
    //   if (!this.constants.imagearray.includes(file.type)) {
    //     this.toastr.clear();
    //     this.toastr.error('File type is not allowed.',"Oops...");
    //     return;
    //   }
    //   var reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = (event) => { // called once readAsDataURL is completed
    //     this.isUpload = true;
    //     this.selectedItemImg = event?.target?.result;
    //     const itemImageFormControl:any = this.userDataForm.get('profile');
    //     itemImageFormControl.setValue(file);
    //     this.toastr.clear();
    //     this.toastr.success('Image uploaded successfully.', "Success");
    //   }
    // }
  }

  removeFillAvatar(): void {
    // const itemFillImageFormControl:any = this.userDataForm.get('profile');
    // itemFillImageFormControl.setValue(null);
    // this.selectedItemImg = null;
  }

  onSubmit() {
    //  this.isBtnLoading = true;
    // if (!this.userDataForm.valid) {
    //   this.toastr.clear();
    //   this.toastr.error('Please enter valid data.', "Oops...");
    //   this.isBtnLoading = false;
    //   return;
    // }
    // // let allBranch = this.userDataForm.value.branchid.filter((index: any) => index != 0 );
    // const userDataObj = new FormData();
    // userDataObj.append('adminuserid', this.userId != "adminuserId" ? this.userId : '');
    // userDataObj.append('profile', this.userDataForm.value.profile || '');
    // userDataObj.append('name', this._globalFunctions.toTitleCase(this.userDataForm.value.name) || '');
    // userDataObj.append('email', this.userDataForm.value.email || '');
    // userDataObj.append('roleid', this.userDataForm.value.roleid || '');
    // userDataObj.append('login_username', this.userDataForm.value.login_username || '');
    // userDataObj.append('login_password', this.userDataForm.value.password || '');
    // userDataObj.append('country_wise_contact', JSON.stringify(this.phoneForm?.controls?.phone?.value) || "");
    // const contactNumber = this.phoneForm?.controls?.phone?.value.e164Number;
    // userDataObj.append('country_code', this.phoneForm?.controls?.phone?.value.dialCode || "");
    // userDataObj.append('mobile', contactNumber.replace(this.phoneForm?.controls?.phone?.value.dialCode, '') || '');

    // this.userDataForm.disable();
    // this._adminService.adminSave(userDataObj).subscribe(
    //   (result: any) => {
    //     if (result && result.IsSuccess) {
    //       this.toastr.clear();
    //       this.toastr.success(result.Message, "Success");
    //       localStorage.setItem('chID', window.btoa(result?.Data?.channelID));
    //       this.isBtnLoading = false;
    //       this._router.navigate(['admin-user']);
    //     } else {
    //       this.userDataForm.enable();
    //       this._globalFunctions.successErrorHandling(result, this, true);
    //       this.isBtnLoading = false;
    //     }
    //   },
    //   (error: any) => {
    //     this.userDataForm.enable();
    //     this._globalFunctions.errorHanding(error, this, true);
    //     this.isBtnLoading = false;
    //   });
  }

  close() {
    this.matDialogRef.close();
  }
}
