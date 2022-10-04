import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  endpointBase = environment.apiUrl;
  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }

  constructor(private _httpClient: HttpClient) {
  }

  getAll() {
    return this._httpClient.get(
      this.endpointBase.concat("Activities"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  create(payload: any) {
    return this._httpClient.post(
      this.endpointBase.concat("Activities"), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  update(id: number, payload: any) {
    return this._httpClient.put(
      this.endpointBase.concat("Activities/" + id), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  delete(id: number) {
    return this._httpClient.delete(
      this.endpointBase.concat("Activities/" + id),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  deleteDoc(id: number) {
    return this._httpClient.delete(
      this.endpointBase.concat("Document/" + id),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }
}
