import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  endpointBase = environment.apiUrl;
  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }

  constructor(private http: HttpClient, private _authService: AuthService) {
    this.http
  }

  getByParentEmailAddress(parentEmail) {
    return this.http.get(
      this.endpointBase.concat("Child/ByParentEmail/" + parentEmail),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  getAll() {
    return this.http.get(
      this.endpointBase.concat("Child/All"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

}
