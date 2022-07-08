import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenResponse } from '../Interface/Interface';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private authenticationService: AuthenticationService) { }

  saveSession(tokenResponse: TokenResponse) {

    window.localStorage.setItem('AT', tokenResponse.accessToken);
    window.localStorage.setItem('RT', tokenResponse.refreshToken);

    if (tokenResponse.UserID) {
      window.localStorage.setItem('ID', tokenResponse.UserID.toString());
      window.localStorage.setItem('FN', tokenResponse.UserFirstName);
      window.localStorage.setItem('RL', tokenResponse.UserRole);
    }

  }

  getSession(): TokenResponse | null {
    if (window.localStorage.getItem('AT')) {
      const tokenResponse: TokenResponse = {
        accessToken: window.localStorage.getItem('AT') || '',
        refreshToken: window.localStorage.getItem('RT') || '',
        UserFirstName: window.localStorage.getItem('FN') || '',
        UserID: +(window.localStorage.getItem('ID') || 0),
        UserRole: window.localStorage.getItem('RL') || '',
      };

      return tokenResponse;
    }
    return null;
  }

  logout() {
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    let session = this.getSession();
    if (!session) {
      return false;
    }

    // check if token is expired
    const jwtToken = JSON.parse(atob(session.accessToken.split('.')[1]));
    const tokenExpired = Date.now() > (jwtToken.exp * 1000);

    return !tokenExpired;

  }

  refreshToken(session: TokenResponse): Observable<TokenResponse> {

    return this.authenticationService.refreshToken(session);
  }

}
