import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceLogService {

  endpointBase = environment.apiUrl;
  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
  constructor(private _httpClient: HttpClient) { }


  getAll() {
    return this._httpClient
      .get(this.endpointBase.concat("AttendanceLog/All"), { reportProgress: true, observe: 'events', headers: this.headers });
  }
}
