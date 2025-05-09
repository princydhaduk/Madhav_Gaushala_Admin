import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { GlobalFunctions } from '../../common/global-function';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _globalFunctions: GlobalFunctions,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    return this._authService.getUserLoggedIn();
  }
}
