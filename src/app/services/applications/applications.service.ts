import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  endpointBase = environment.apiUrl;
  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }

  constructor(private _httpClient: HttpClient) {
  }


  getAll() {
    return this._httpClient.get(
      this.endpointBase.concat("Applications/All"),
      { reportProgress: true, observe: 'events', headers:this.headers }
    );
  }

  accept(applicationId: number) {
    return this._httpClient.get(
      this.endpointBase.concat("Applications/Accept/" + applicationId),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  rejected(applicationId: number) {
    return this._httpClient.get(
      this.endpointBase.concat("Applications/Reject/" + applicationId),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

}
