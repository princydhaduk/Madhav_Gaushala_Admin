import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from '../common/global-function';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private http:HttpClient, private _globalFunctions:GlobalFunctions) { }

  getProfile(): any {
    return this.http.get(environment.appURL + 'admin/user/getprofile', this._globalFunctions.getAuthorizationHeader());
  }

}
