import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  endpointBase = environment.apiUrl;
  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }

  constructor(private _httpClient: HttpClient) {
  }

  getSchoolClassAttendance(payload) {
    return this._httpClient.post(
      this.endpointBase.concat("Reporting/SchoolClassAttendance"), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  getApplications(payload) {
    return this._httpClient.post(
      this.endpointBase.concat("Reporting/Applications"), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

}
