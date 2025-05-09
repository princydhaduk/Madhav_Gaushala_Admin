import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalFunctions } from '../../../common/global-function';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CONSTANTS } from '../../../common/constants';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { AdminUserService } from '../admin-user.service';
import { PasswordValidators } from '../../../common/password-validators';
import { ToastrService } from 'ngx-toastr';
import { RolePermissionService } from '../../role-permission/role-permission.service';

@Component({
  selector: 'app-add-edit-admin',
  templateUrl: './add-edit-admin.component.html',
  //styleUrls: [: './add-edit-admin.component.scss'
})
export class AddEditAdminComponent implements OnInit {

  userDataForm:any = FormGroup;
  constants:any = CONSTANTS;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  Countrylist: any[] = [];
  preferredCountries: CountryISO[] = [CountryISO.India];
  phoneForm: any = new FormGroup({
    phone: new FormControl(null, [Validators.required])
  });
  roleList: any = [];
  selectedItemImg: any;
  isUpload: boolean = false;
  isBtnLoading: boolean = false;
  userId: any;
  pageType: any;
  isPasswordView: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private toastr:ToastrService,
    private _adminService:AdminUserService,
    private _globalFunctions:GlobalFunctions,
    private _router:Router,
    private _roleService:RolePermissionService,
    private _activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getRoleList();
    this.userId = this._activatedRoute.snapshot.paramMap.get('id');
    if (this.userId && this.userId != "adminuserId") {
      this.pageType = "Edit";
      let param = {
        adminuserid: this.userId
      }
      this._adminService.adminGetOne(param).subscribe((result: any) => {
        if (result && result.IsSuccess) {
          this.setUserData(result?.Data);
        } else {
          this._globalFunctions.successErrorHandling(result, this, true);
        }
      }, (error: any) => {
        this._globalFunctions.errorHanding(error, this, true);
      });
    }
  }

  getRoleList() {
    let filterObj = {
      search: "",
      branchid: window.atob(localStorage.getItem('dbrnch')!)
    }
    this._roleService.getRoleListWithoutPagination(filterObj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.roleList = result.Data;
      } else {
        this.isBtnLoading = false;
        this._globalFunctions.successErrorHandling(result, this, true)
      }
    }, (error: any) => {
      this.isBtnLoading = false;
      this._globalFunctions.errorHanding(error, this, true);
    })
  }

  initForm() {
    this.userDataForm = this._formBuilder.group({
      profile: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      roleid: ['', Validators.required],
      login_username: ['', Validators.required],
      password: ['', [Validators.required, Validators.compose([
        Validators.required,
        Validators.minLength(8),
        PasswordValidators.patternValidator(new RegExp("(?=.*[0-9])"), {
          requiresDigit: true
        }),
        PasswordValidators.patternValidator(new RegExp("(?=.*[A-Z])"), {
          requiresUppercase: true
        }),
        PasswordValidators.patternValidator(new RegExp("(?=.*[a-z])"), {
          requiresLowercase: true
        }),
        PasswordValidators.patternValidator(new RegExp("(?=.*[$@^!%*?&])"), {
          requiresSpecialChars: true
        })
      ])]],
    });
  }

  get passwordValid() {
    return this.userDataForm.controls["password"].errors === null;
  }

  get requiredValid() {
    return !this.userDataForm.controls["password"].hasError("required");
  }

  get minLengthValid() {
    return !this.userDataForm.controls["password"].hasError("minlength");
  }

  get requiresDigitValid() {
    return !this.userDataForm.controls["password"].hasError("requiresDigit");
  }

  get requiresUppercaseValid() {
    return !this.userDataForm.controls["password"].hasError("requiresUppercase");
  }

  get requiresLowercaseValid() {
    return !this.userDataForm.controls["password"].hasError("requiresLowercase");
  }

  get requiresSpecialCharsValid() {
    return !this.userDataForm.controls["password"].hasError("requiresSpecialChars");
  }

  uploadItemImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!this.constants.imagearray.includes(file.type)) {
        this.toastr.clear();
        this.toastr.error('File type is not allowed.',"Oops...");
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.isUpload = true;
        this.selectedItemImg = event?.target?.result;
        const itemImageFormControl:any = this.userDataForm.get('profile');
        itemImageFormControl.setValue(file);
        this.toastr.clear();
        this.toastr.success('Image uploaded successfully.', "Success");
      }
    }
  }

  removeFillAvatar(): void {
    const itemFillImageFormControl:any = this.userDataForm.get('profile');
    itemFillImageFormControl.setValue(null);
    this.selectedItemImg = null;
  }

  setUserData(data: any) {
    this.userDataForm.get('profile').setValue(data?.profile);
    this.selectedItemImg = data?.profile ? data?.profile : '';
    this.userDataForm.get('name').setValue(data?.name);
    this.userDataForm.get('email').setValue(data?.email);
    this.userDataForm.get('roleid').setValue(data?.roleid?._id);
    this.userDataForm.get('login_username').setValue(data?.login_username);
    this.userDataForm.get('password').setValue(data?.login_password);
    this.phoneForm.get('phone').setValue(data?.country_code + " " + data?.mobile);
  }
  

  onSubmitAction(): void {
    this.isBtnLoading = true;
    if (!this.userDataForm.valid) {
      this.toastr.clear();
      this.toastr.error('Please enter valid data.', "Oops...");
      this.isBtnLoading = false;
      return;
    }
    // let allBranch = this.userDataForm.value.branchid.filter((index: any) => index != 0 );
    const userDataObj = new FormData();
    userDataObj.append('adminuserid', this.userId != "adminuserId" ? this.userId : '');
    userDataObj.append('profile', this.userDataForm.value.profile || '');
    userDataObj.append('name', this._globalFunctions.toTitleCase(this.userDataForm.value.name) || '');
    userDataObj.append('email', this.userDataForm.value.email || '');
    userDataObj.append('roleid', this.userDataForm.value.roleid || '');
    userDataObj.append('login_username', this.userDataForm.value.login_username || '');
    userDataObj.append('login_password', this.userDataForm.value.password || '');
    userDataObj.append('country_wise_contact', JSON.stringify(this.phoneForm?.controls?.phone?.value) || "");
    const contactNumber = this.phoneForm?.controls?.phone?.value.e164Number;
    userDataObj.append('country_code', this.phoneForm?.controls?.phone?.value.dialCode || "");
    userDataObj.append('mobile', contactNumber.replace(this.phoneForm?.controls?.phone?.value.dialCode, '') || '');

    this.userDataForm.disable();
    this._adminService.adminSave(userDataObj).subscribe(
      (result: any) => {
        if (result && result.IsSuccess) {
          this.toastr.clear();
          this.toastr.success(result.Message, "Success");
          localStorage.setItem('chID', window.btoa(result?.Data?.channelID));
          this.isBtnLoading = false;
          this._router.navigate(['admin-user']);
        } else {
          this.userDataForm.enable();
          this._globalFunctions.successErrorHandling(result, this, true);
          this.isBtnLoading = false;
        }
      },
      (error: any) => {
        this.userDataForm.enable();
        this._globalFunctions.errorHanding(error, this, true);
        this.isBtnLoading = false;
      }
    );
  }

}
