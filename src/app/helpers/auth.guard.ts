import { Injectable } from '@angular/core';
import { Router,ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {  EMPTY, Observable,  throwError } from 'rxjs';
import {catchError,tap,map} from 'rxjs/operators';

import { TokenResponse } from '../Interface/Interface';
import { ErrorResponse } from '../Interface/Interface';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
) {}

canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  let session = this.tokenStorageService.getSession();
  if (session == null) {
    this.router.navigate(['auth/login']);
    return false;
  }

  if (!this.tokenStorageService.isLoggedIn()) {

    console.log(`session is expired, let's renew the tokens`);
    // refresh token
    return this.checkSession(session);
  }
  return true;
}

checkSession(session: TokenResponse): Observable<boolean> {
  return this.tokenStorageService.refreshToken(session).pipe(
    map(data => {
      console.log(`refreshToken repsonse is ${JSON.stringify(data)}`);
      this.tokenStorageService.saveSession(data);
      return true;
    }),
    catchError((error: ErrorResponse) => {
      console.log(`inside checkSession ${JSON.stringify(error)}`);
      this.router.navigate(['auth/login']);
      return EMPTY;
    })
  );

}

}
