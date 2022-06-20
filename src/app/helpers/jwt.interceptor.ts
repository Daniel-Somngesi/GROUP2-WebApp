import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { TokenStorageService } from '../services/token-storage.service';
import { environment } from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenStorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available

        const isApiUrl = request.url.startsWith(environment.apiUrl);
        const isLoggedIn = this.tokenService.isLoggedIn();
        console.log('inside intercept');
        console.log(`request is ${JSON.stringify(request.body)}`);
          if (isLoggedIn && isApiUrl) {
            let session = this.tokenService.getSession();
      if (session){
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${session.accessToken}`
                }
            });
          }
        }


        return next.handle(request);
    }
}
