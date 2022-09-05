import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) { }
  canActivate(_route: any, state: RouterStateSnapshot) {
    if (this._authService.isSignedIn()) {
      return true;
    }

    this._router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) { }
  canActivate(_route: any, state: RouterStateSnapshot) {
    if (this._authService.isSignedIn()) {
      let user = this._authService.currentUser
      if (user.EmployeeType == 'Admin' || user.UserRole == 'administrator') {
        return true;
      }
      else {
        this._router.navigate(['']);
        return false;
      }

    }
  }

}

