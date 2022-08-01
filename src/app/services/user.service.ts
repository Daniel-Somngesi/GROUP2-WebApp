import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpointBase = environment.apiUrl;
  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }

  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(
      this.endpointBase.concat("Users/All"),
      { reportProgress: true, observe: 'events', headers:this.headers }
    );

  }

  register(user: User) {
    return this.http.post(`/users/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }
}
