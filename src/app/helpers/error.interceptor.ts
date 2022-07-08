import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {  EMPTY, Observable,  throwError } from 'rxjs';
import {catchError,tap} from 'rxjs/operators';
import { ErrorResponse } from '../Interface/Interface';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  isRefreshingToken: boolean = false;
  constructor(private tokenStorageService: TokenStorageService, private uthenticationService: AuthenticationService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        tap(response => console.log(JSON.stringify(response))),
        catchError((error: HttpErrorResponse) => {

          console.log(JSON.stringify(error));
          let session = this.tokenStorageService.getSession();
          if (error.status === 401 && session != null && !this.tokenStorageService.isLoggedIn() && !this.isRefreshingToken) {
            this.isRefreshingToken = true;
            console.log('Access Token is expired, we need to renew it');
            this.uthenticationService.refreshToken(session).subscribe({
              next: data => {
                console.info('Tokens renewed, we will save them into the local storage');
                this.tokenStorageService.saveSession(data);
              },
              error: () => { },
              complete: () => { this.isRefreshingToken = false }
            });
          } else if (error.status === 400 && error.error.errorCode === 'invalid_grant') {
            console.log('the refresh token has expired, the user must login again');
            this.tokenStorageService.logout();
            this.router.navigate(['login']);


          } else {
            let errorResponse: ErrorResponse = error.error;
            console.log(JSON.stringify(errorResponse));

            return throwError(() => errorResponse);
          }

          return EMPTY;
        })
      );
  }
}
export const ErrorInterceptorProvider = { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true };
