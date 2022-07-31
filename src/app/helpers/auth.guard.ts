import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { TokenResponse } from '../Interface/Interface';
import { ErrorResponse } from '../Interface/Interface';
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
