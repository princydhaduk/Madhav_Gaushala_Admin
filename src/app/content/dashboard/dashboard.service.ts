import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from '../../common/global-function';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

 constructor(private http: HttpClient, private _globalFunctions: GlobalFunctions) { }
 
   getAllCounts(data: any): any {
     return this.http.post(environment.appURL + 'admin/dashboard/counts', data, this._globalFunctions.getAuthorizationHeader());
   }

   getRoomBookingEarning(data: any): any {
     return this.http.post(environment.appURL + 'admin/dashboard/roombookingearning', data, this._globalFunctions.getAuthorizationHeader());
   }

   getTodaysBookingCount(data: any): any {
     return this.http.post(environment.appURL + 'admin/dashboard/todaybookingcount', data, this._globalFunctions.getAuthorizationHeader());
   }

   getCurrentMonthIncome(data: any): any {
     return this.http.post(environment.appURL + 'admin/dashboard/currentmonthincome', data, this._globalFunctions.getAuthorizationHeader());
   }

   getMemberCounts(data: any): any {
     return this.http.post(environment.appURL + 'admin/dashboard/membercounts', data, this._globalFunctions.getAuthorizationHeader());
   }

   getInquiriesCount(data: any): any {
     return this.http.post(environment.appURL + 'admin/dashboard/inquiriescounts', data, this._globalFunctions.getAuthorizationHeader());
   }
}
