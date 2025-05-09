import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from '../../common/global-function';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService {

  constructor(private http: HttpClient, private _globalFunctions: GlobalFunctions) { }

  //Get All Products
  getRoleListWithPagination(data: any): any {
    return this.http.post(environment.appURL + 'admin/role/list', data, this._globalFunctions.getAuthorizationHeader());
  }

  getRoleListWithoutPagination(data: any): any {
    return this.http.post(environment.appURL + 'admin/role', data, this._globalFunctions.getAuthorizationHeader());
  }

  getRoleById(roleID: any = {}): any {
    return this.http.post(environment.appURL + 'admin/role/getone', roleID,this._globalFunctions.getAuthorizationHeader());
  }

  getDefaultRole(): any {
    return this.http.get(environment.appURL + 'admin/role/getpermission', this._globalFunctions.getAuthorizationHeader());
  }

  addEditRoles(data: any = {}): any {
    return this.http.post(environment.appURL + 'admin/role/save', data,this._globalFunctions.getAuthorizationHeader());
  }

  changeRoleStatus(roleID: any = {}): any {
    return this.http.post(environment.appURL + 'admin/role/change', roleID,this._globalFunctions.getAuthorizationHeader());
  }

  removeRole(roleID: any = {}): any {
    return this.http.post(environment.appURL + 'admin/role/remove', roleID,this._globalFunctions.getAuthorizationHeader());
  }
}
