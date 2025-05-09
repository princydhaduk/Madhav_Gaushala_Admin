import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private _router: Router
  ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  | Promise<boolean> | boolean{
    return new Promise((resolve, reject) => {
      Promise.all([
        this._check(state)
      ]).then(() => {
        resolve(true);
      }, reject);
    });
  }

  private _check(state: any): boolean {
    // Check the authentication status
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this._router.navigate(['/dashboard']);
      return false;
    } else {
      if (!state.url || state.url == '/') {
        this._router.navigate(['login']);
      }
      return true;
    }
  }
}
