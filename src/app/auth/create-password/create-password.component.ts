import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalFunctions } from '../../common/global-function';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  // styleUrl: './create-password.component.scss'
})
export class CreatePasswordComponent implements OnInit{

  isBtnLoading: boolean = false;
  hideconfirmPassword: boolean = true;
  hidePassword: boolean = true;
  createPasswordForm:any = FormGroup;
  userEmail:string = '';
  isForgetPin:boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _globalFunctions: GlobalFunctions,
    private _authService:AuthService,
    private toastr:ToastrService
  ){}

  ngOnInit(): void {
    this.createPasswordForm = this._formBuilder.group({
      newPassword: ['', [Validators.required,Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required,Validators.minLength(4)]],
    });
    if(typeof window != 'undefined'){
      this.isForgetPin = JSON.parse(localStorage.getItem('isForgetPin') !)
      if(!localStorage.getItem('registerEmail') || localStorage.getItem('registerEmail') == null){
        this._router.navigate(['/login']);
      } else {
        this.userEmail = localStorage.getItem('registerEmail')!;
      }
    }
  }

  showPassword(){
    this.hidePassword = !this.hidePassword;
  }

  showConfirmPassword(){
    this.hideconfirmPassword = !this.hideconfirmPassword;
  }

  createPin(){
    this.isBtnLoading = true;
    // if (!this.validate()) {
    //   return;
    // }
    if(this.createPasswordForm.value.newPassword !== this.createPasswordForm.value.confirmPassword){
      this.createPasswordForm.value.confirmPassword = '';
      this.toastr.clear();
      this.toastr.error('Please enter a same Password!', 'Opps..!')
      this.isBtnLoading = false;              
      return;
    }
    const setPasswordObject: any = {
      email : this.userEmail,      
      password : this.createPasswordForm.value.newPassword,     
    };
    this.createPasswordForm.disable();
    this._authService.resetPassword(setPasswordObject).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.toastr.clear();
        this.toastr.success(result.Message, 'Success');
        localStorage.setItem('accessToken', result.Data.accesstoken);
        this._router.navigate(['/dashboard']);
        // this.location.back();
        if(typeof window != 'undefined'){
          localStorage.removeItem('isForgetPin');
        }
        this.isBtnLoading = false;
      } else {
        this.createPasswordForm.enable();
        this._globalFunctions.successErrorHandling(result, this, true);
        this.isBtnLoading = false;
      }
    }, (error: any) => {
      this.createPasswordForm.enable();
      this.createPasswordForm.resetForm();
      this._globalFunctions.errorHanding(error, this, true);
      this.isBtnLoading = false;
    });
  }
}
