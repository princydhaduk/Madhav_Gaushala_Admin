import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CountryISO, SearchCountryField, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar, toHTML } from 'ngx-editor';
import { GlobalFunctions } from '../../common/global-function';
import { SettingService } from './setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  //styleUrls: [: './setting.component.scss'
})
export class SettingComponent {
  isDataLoading:boolean = false
  isBtnLoading: boolean = false;
  settingDetailsForm:any = FormGroup;
  settingDetails:any;
  @ViewChild('invoiceNgForm') invoiceNgForm: any;
  tAcLength:any = 0;
  html = '';
  editor !: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.India];
  isPinCodeCheck:boolean = false;

  phoneForm:any = new FormGroup({
    phone: new FormControl(null, [Validators.required]),
  });

  @ViewChild('phoneF') form: any;

  constructor(
    private _fromBuilder:FormBuilder,
    private _globalFunctions:GlobalFunctions,
    private _toastr:ToastrService,
    private _dialogRef:MatDialog,
    private _settingServices:SettingService
  ){}

  ngOnInit(): void {
    this.editor = new Editor();
    this.prepareSettingDetailsFormObj();
    this.getSettingDetails()
  }


  
  getSettingDetails(){
    this._settingServices.getDetails().subscribe((result:any)=>{
      if(result && result.IsSuccess){
        this.settingDetails = result.Data;
        this.prepareSettingDetailsFormObj(this.settingDetails);
        if (this.settingDetailsForm.get('tc')) {
          this.settingDetailsForm.get('tc').setValue(result?.Data?.tc);
        }
        this.tAcLength = result?.Data?.tc.replace(/<\/?[^>]+(>|$)/g, "").length
        this.isDataLoading = true;
        //this.settingDetailsForm.patchValue(this.settingDetails)
      } else {
        this._globalFunctions.successErrorHandling(result,this,true)
      }
    },(error:any)=>{
      this._globalFunctions.errorHanding(error,this,true)
    })
  }

  termsAndConditionsLength(event: any = ''){
    this.tAcLength = event.replace(/<\/?[^>]+(>|$)/g, "").length;
    if(event.length > 10000){
      this._toastr.clear();
      this._toastr.error("You can not write more product description", 'Oops!');
    }
  }
  
  onSubmitAction(){
    this.isBtnLoading = true;
    if (!this.settingDetailsForm.valid) {
      Object.keys(this.settingDetailsForm.controls).forEach((key) => {
        this.settingDetailsForm.controls[key].touched = true;
        this.settingDetailsForm.controls[key].markAsDirty();
      })
      this._toastr.clear();
      this._toastr.error("Please enter valid data", "Oops!");
      this.isBtnLoading = false;
      return;
    }

    if (this.phoneForm.invalid) {
      Object.keys(this.phoneForm.controls).forEach((key)=> {
        this.phoneForm.controls[key].touched = true;
        this.phoneForm.controls[key].markAsDirty();
      });
      this._toastr.clear();
      this._toastr.error("Please enter valid data", "Oops!");
      this.isBtnLoading = false;
      return;
    }


    if (this.tAcLength > 10000) {
      this._toastr.clear();
      this._toastr.error("Please write 10000 character for product details.", 'Oops!');
      this.isBtnLoading = false;
      return;
    }

    if (this.isPinCodeCheck) {
      this._toastr.clear();
      this._toastr.error("Please enter valid pincode.", 'Oops!');
      this.isBtnLoading = false;
      return;
    }


    const settingDataObj:any = {
      // amc_amount: parseInt(this.settingDetailsForm.value.amc_amount) || 0,
      email:this.settingDetailsForm.value.email || '',
      gst_no:this.settingDetailsForm.value.gst_no || '',
      address:this.settingDetailsForm.value.address || '',
      tc:this.settingDetailsForm.value.tc || '',
    }
    settingDataObj.country_wise_contact = this.phoneForm?.value?.phone || "";
    const contactNumber = settingDataObj?.country_wise_contact?.e164Number;
    settingDataObj.country_code = settingDataObj?.country_wise_contact?.dialCode || "";
    settingDataObj.mobile = contactNumber.replace(settingDataObj?.country_code, '') || '';

    this.settingDetailsForm.disable();
    this._settingServices.settingDetails(settingDataObj).subscribe((result:any)=>{
      if(result && result.IsSuccess){
        this._toastr.clear();
        this._toastr.success(result.Message,'Success');
        this.getSettingDetails();
        this.isBtnLoading = false;
      } else {
        this.isBtnLoading = false;
        this.settingDetailsForm.enable();
        this._globalFunctions.successErrorHandling(result,this,true);
      }
    },(error:any)=>{
      this.isBtnLoading = false;
      this.settingDetailsForm.enable();
      this._globalFunctions.errorHanding(error,this,true)
    })
  }

  prepareSettingDetailsFormObj(tempObj:any = {}){
    this.settingDetailsForm = this._fromBuilder.group({
      // amc_amount     : [tempObj?.amc_amount                || '',[Validators.required,Validators.pattern(/^[.\d]+$/)]],                           
      gst_no     : [tempObj?.gst_no                || '',[Validators.required,Validators.pattern('^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')]],                           
      email      : [tempObj?.email                 || '',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      address       : [tempObj?.address         || '',[Validators.required]],             
      tc         : [null],
    });

    this.phoneForm.patchValue({
      phone:  tempObj.country_code + " " + tempObj.mobile || null
    });
  }
}
