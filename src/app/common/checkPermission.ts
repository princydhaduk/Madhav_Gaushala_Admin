import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class checkPermission{
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _router: Router,
  ) {}

  checkPermissionByPage(pageName: string, permissionType: string): any {
    if (localStorage.getItem('rolePermission') != null) {
      let roleData = localStorage.getItem('rolePermission') ? JSON.parse(window.atob(localStorage.getItem('rolePermission') || "")) : null;
      let checkPermission = roleData.permissions;
      let count = 0;
      checkPermission.map((item: any) => {
        if (item.displayname == pageName && item[permissionType]) {
          count++;
        }
      });

      if (count > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}