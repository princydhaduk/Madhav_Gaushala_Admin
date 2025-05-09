import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { GlobalFunctions } from '../../common/global-function';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(
    private http:HttpClient,
    private _globalFunction:GlobalFunctions
  ) { }

  settingDetails(data:any = {}):any{
    return this.http.post(environment.appURL + 'admin/settings/save',data, this._globalFunction.getAuthorizationHeader());    
  }
  
  getDetails(){
    return this.http.get(environment.appURL + 'admin/settings/getone', this._globalFunction.getAuthorizationHeader());    
  }
}
