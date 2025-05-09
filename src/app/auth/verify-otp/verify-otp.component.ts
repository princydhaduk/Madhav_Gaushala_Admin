import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { GlobalFunctions } from '../../common/global-function';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  // styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit, DoCheck{
  
  isBtnLoading: boolean = false;
  otpValue:any;
  otp:FormControl | any;
  display: any;
  otpInputConfig:any = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: true,
    placeholder: '0',
  };
  userEmail: string = '';
  isForgetPin: any;
  viewEmailAddress: any;
  isShowTimer:boolean = true;
  timer: any;

  constructor(
    private _router:Router,
    private toastr:ToastrService,
    private _authService:AuthService,
    private _globalFunctions:GlobalFunctions
  ){}

  ngOnInit(): void {
    if (typeof window != 'undefined') {
      this.isForgetPin = JSON.parse(localStorage.getItem('isForgetPin')!)
      if (!localStorage.getItem('registerEmail') || localStorage.getItem('registerEmail') == null) {
        this._router.navigate(['/login']);
      } else {
        this.userEmail = localStorage.getItem('registerEmail')!;
        this.viewEmailAddress = localStorage.getItem('registerEmail')!.toString().slice(this.userEmail.indexOf('@') - 4).padStart(this.userEmail.length, "*");
      }
    }
    this.otp = new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern("^[0-9]*$")]);
    this.timerFunction(1);
  }

  ngDoCheck(): void {
    if (typeof document !== 'undefined'){
      if (this.isShowTimer && document?.getElementById('showResendOTP') != null && document?.getElementById('showTimer') != null) {
        const element: any = document?.getElementById('showResendOTP');
        const sTimer: any = document?.getElementById('showTimer');
        if (this.isShowTimer) {
          element.style.display = 'none';
          sTimer.style.display = 'block';
        } else {
          element.style.display = 'block';
          sTimer.style.display = 'none';
        };
      }
    }
  }

  onOtpChange(event:any){
    if (event.length == 6) {
      this.otp.markAsDirty();
      this.otp.markAsTouched();
    }
  }

  timerFunction(minute: any) {
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    this.timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        this.isShowTimer = false;
        clearInterval(this.timer);
      }
    }, 1000)
  }

  resendOTP(){
    // this.timer(1);
    if (!this.userEmail) {
      this.toastr.error('Please enter a valid email before resending OTP!', 'Opps..!')
      return;
    }
  
    this._authService.forgotPassword({ email: this.userEmail }).subscribe(
      (result: any) => {
        if (result.IsSuccess) {
          this.toastr.clear();
          this.toastr.success(result.Message, 'Success');
          clearInterval(this.timer);
          this.timerFunction(1);
          this.isShowTimer = true;
  
        } else {
          this._globalFunctions.successErrorHandling(result.Message, this, true);
        }
      },
      (error: any) => {
        this._globalFunctions.errorHanding(error, this, true);
      });
  }

  verifyOtp(){
    this.isBtnLoading = true;
    if (!this.otp.valid) {
      this.otp.markAsDirty();
      this.otp.markAsTouched();
      this.toastr.error('Please enter valid OTP code!','Opps..!')
      return;
    }
    const otpObj: any = {
      email: this.userEmail,
      otp: this.otp.value
    };
    this._authService.otpVarification(otpObj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.toastr.clear();
        this.toastr.success(result.Message, 'Success');
        if(this.isForgetPin){
          this._router.navigate(['/create-password']);
        } else {
          this._router.navigate(['/create-password']);
        }
        // this._router.navigate(['/create-password']);
      } else{
        this.otp.enable();
        this._globalFunctions.successErrorHandling(result, this, true);
        this.isBtnLoading = false;
      }
    }, (error: any) => {
      this.otp.enable();
      this.otp.setValue(null);
      this._globalFunctions.errorHanding(error, this, true);
      this.isBtnLoading = false;
    });
  }

}
