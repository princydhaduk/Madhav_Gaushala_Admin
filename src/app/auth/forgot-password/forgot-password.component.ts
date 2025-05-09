import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalFunctions } from '../../common/global-function';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  //styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{

  isBtnLoading: boolean = false;
  forgetPassword:any = FormGroup;
  isForgetPin: any;

  constructor(
    private _router:Router,
    private _formBuilder:FormBuilder,
    private _globalFunctions:GlobalFunctions,
    private _authService:AuthService,
    private toastr:ToastrService
  ){}

  ngOnInit(): void {
    this.isForgetPin = JSON.parse(localStorage.getItem('isForgetPin') !)
    this.forgetPassword = this._formBuilder.group({
      email:['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]]
    })
  }

  getOtp(){
    this.isBtnLoading = true;
    this._authService.forgotPassword({email:this.forgetPassword.value.email}).subscribe((result:any)=>{
      if(result.IsSuccess){
        if(typeof window != 'undefined'){
          localStorage.setItem('registerEmail',this.forgetPassword.value.email);
          localStorage.setItem('isForgetPin',JSON.stringify(true))
        }
        // localStorage.setItem('accessToken', result.Data.accesstoken);
        this.toastr.clear();
        this.toastr.success(result.Message, 'Success');
        // if(this.isForgetPin){
        //   this._router.navigate(['/create-password']);
        // } else {
          // this._router.navigate(['/verify-otp']);
        // }
        this._router.navigate(['/verify-otp']);
        this.isBtnLoading = false;
      } else {
        this._globalFunctions.successErrorHandling(result.Message,this,true);
        this.isBtnLoading = false;
      }
    },(error:any)=>{
      this._globalFunctions.errorHanding(error,this,true);
      this.isBtnLoading = false;
    })
  }
}
