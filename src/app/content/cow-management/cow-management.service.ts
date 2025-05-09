import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from 'src/app/common/constants';
import { GlobalFunctions } from 'src/app/common/global-function';

@Injectable({
  providedIn: 'root'
})
export class CowManagementService {

   constructor(
      private _http:HttpClient,
      private _globalfunctions:GlobalFunctions
    ) { }
  
    adminListWP(data:any){
      return this._http.post(CONSTANTS.appUrl + "admin/user/list", data, this._globalfunctions.getAuthorizationHeader());
    }
  
    adminListWOP(data:any){
      return this._http.post(CONSTANTS.appUrl + "admin/user", data, this._globalfunctions.getAuthorizationHeader());
    }
  
    adminSave(data:any){
      return this._http.post(CONSTANTS.appUrl + "admin/user/save", data, this._globalfunctions.getFileAuthorizationHeader());
    }
  
    adminGetOne(data:any){
      return this._http.post(CONSTANTS.appUrl + "admin/user/getone", data, this._globalfunctions.getFileAuthorizationHeader());
    }
  
    adminChangeStatus(data:any){
      return this._http.post(CONSTANTS.appUrl + "admin/user/change", data, this._globalfunctions.getAuthorizationHeader());
    }
}
