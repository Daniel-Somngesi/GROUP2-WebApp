import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  endpointBase = environment.apiUrl;
  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
  constructor(private _httpClient: HttpClient) { }


  getAll() {
    return this._httpClient
      .get(this.endpointBase.concat("Profile/All"),
        { reportProgress: true, observe: 'events', headers: this.headers });
  }

  getByParentEmailAddress(email: string) {
    return this._httpClient.get(
      this.endpointBase.concat("Profile/ByParentEmail/" + email),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  delete(id: number) {
    return this._httpClient.delete(
      this.endpointBase.concat("Profile/" + id),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }
}
