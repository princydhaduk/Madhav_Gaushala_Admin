import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from '../../common/global-function';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private http: HttpClient, private _globalFunctions: GlobalFunctions) { }

  //Get All Products
  getRoomsWithPagination(data: any): any {
    return this.http.post(environment.appURL + 'admin/rooms', data, this._globalFunctions.getAuthorizationHeader());
  }

  getRoomsWithoutPagination(): any {
    return this.http.get(environment.appURL + 'admin/rooms', this._globalFunctions.getAuthorizationHeader());
  }

  getRoomsById(roleID: any = {}): any {
    return this.http.post(environment.appURL + 'admin/rooms/getone', roleID, this._globalFunctions.getAuthorizationHeader());
  }

  addEditRooms(data: any = {}): any {
    return this.http.post(environment.appURL + 'admin/rooms/save', data, this._globalFunctions.getAuthorizationHeader());
  }

  changeStatus(data: any = {}): any {
    return this.http.post(environment.appURL + 'admin/rooms/change', data, this._globalFunctions.getAuthorizationHeader());
  }

  removeRooms(data: any = {}): any {
    return this.http.post(environment.appURL + 'admin/rooms/remove', data, this._globalFunctions.getAuthorizationHeader());
  }

  multiFileUpload(data: any = {}): any {
    return this.http.post(environment.appURL + 'admin/rooms/uploadmultiple', data, this._globalFunctions.getFileAuthorizationHeader());
  }

  singleFileUpload(data: any = {}): any {
    return this.http.post(environment.appURL + 'admin/rooms/upload', data, this._globalFunctions.getFileAuthorizationHeader());
  }
}
