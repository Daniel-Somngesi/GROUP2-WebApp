import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { CurrentUser } from '../../helpers/types/auth.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpointBase = environment.apiUrl;
  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }


  constructor(private http: HttpClient) {
  }

  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;

    const helper = new JwtHelperService();
    return helper.decodeToken(token) as CurrentUser;
  }

  getAllRoles() {
    return this.http.get(
      this.endpointBase.concat("UserRole"),
      { reportProgress: true, observe: 'events' }
    );
  }

  resetPassword(payload) {
    return this.http
      .post(this.endpointBase.concat("Account/ResetPassword"), payload, { reportProgress: true, observe: 'events', headers: this.headers });
  }

  signIn(payload) {
    return this.http
      .post(this.endpointBase.concat("Account/LogIn/Employee"), payload, { reportProgress: true, observe: 'events' });
  }

  requestOTP(payload) {
    return this.http
      .post(this.endpointBase.concat("Account/RequestOTP"), payload, { reportProgress: true, observe: 'events' });
  }

  validateOTP(payload) {
    return this.http
      .post(this.endpointBase.concat("Account/ValidateOTP"), payload, { reportProgress: true, observe: 'events' });
  }

  register(payload) {
    return this.http
      .post(this.endpointBase.concat("Account/Register"), payload, { reportProgress: true, observe: 'events' });
  }

  ForgotPassword(email) {
    return this.http.get(this.endpointBase.concat("Account/ForgotPassword/") + email, { reportProgress: true, observe: 'events' });
  }

  ResetPassword(payload) {
    return this.http.post(this.endpointBase.concat("Account/ResetPassword"), payload, { reportProgress: true, observe: 'events' });
  }

  signOut() {
    window.location.replace("");
    localStorage.removeItem('token');
  }

  isSignedIn() {
    let token = localStorage.getItem('token');
    if (!token) return false;

    const helper = new JwtHelperService();
    if (helper.isTokenExpired(token)) return false;

    return true;
  }

  storeUserNameInLocalStorage(username: string) {
    localStorage.setItem('username', username);
  }
  getUserNameFromLocalStorage() {
    return localStorage.getItem('username');
  }
}
