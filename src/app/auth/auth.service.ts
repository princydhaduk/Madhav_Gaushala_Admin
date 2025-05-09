import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../common/constants';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalFunctions } from '../common/global-function';

const MINUTES_UNITL_AUTO_LOGOUT = 60 // in mins
const CHECK_INTERVAL = 15000 // in ms
const STORE_KEY = 'lastAction';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _httpClient: HttpClient,
    private _globalFunction: GlobalFunctions,
    private router: Router,
    private toatr:ToastrService) { 
      //this.check();
      // this.initListener();
      // this.initInterval();
      // localStorage.setItem(STORE_KEY, Date.now().toString());
    }

    logIn(credentials: any): Observable<any> {
      return this._httpClient.post(CONSTANTS.appUrl + 'admin/login', credentials, this._globalFunction.getHeader());
    }

    forgotPassword(credentials: any): Observable<any> {
      return this._httpClient.post(CONSTANTS.appUrl + 'admin/forgetpassword', credentials, this._globalFunction.getHeader());
    }

    otpVarification(credentials: any): Observable<any> {
      return this._httpClient.post(CONSTANTS.appUrl + 'admin/verifyotp', credentials, this._globalFunction.getHeader());
    }

    resetPassword(credentials: any): Observable<any> {
      return this._httpClient.post(CONSTANTS.appUrl + 'admin/setpassword', credentials, this._globalFunction.getHeader());
    }
  
    // check user is valid to access the component or not
    getUserLoggedIn() {
      if (localStorage.getItem('accessToken')) {
        return true;
      }
      localStorage.removeItem('accessToken');
      localStorage.clear();
      this.toatr.clear();
      this.toatr.error("Unauthorized Access.", "Oops!");
      this.router.navigate(['/login']);
      return false;
    }

    public setLastAction(lastAction: number) {
      localStorage.setItem(STORE_KEY, lastAction.toString());
    }

    public getLastAction() {
      let res: any = localStorage.getItem(STORE_KEY);
      return parseInt(res);
    }

    // reset() {
    //   this.setLastAction(Date.now());
    // }

    // initListener() {
    //   document.body.addEventListener('click', () => this.reset());
    //   document.body.addEventListener('mouseover', () => this.reset());
    //   document.body.addEventListener('mouseout', () => this.reset());
    //   document.body.addEventListener('keydown', () => this.reset());
    //   document.body.addEventListener('keyup', () => this.reset());
    //   document.body.addEventListener('keypress', () => this.reset());
    // }

    // initInterval() {
    //   setInterval(() => {
    //     this.check();
    //   }, CHECK_INTERVAL);
    // }

    check() {
      // const now = Date.now();
      // const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
      // const diff = timeleft - now;
      // const isTimeout = diff < 0;

      // if (isTimeout) {
        localStorage.removeItem('accessToken');
        localStorage.clear();
        this.toatr.clear();
        this.toatr.error("Unauthorized Access.", "Oops!");
        this.router.navigate(['']);
     // }
    }

}
