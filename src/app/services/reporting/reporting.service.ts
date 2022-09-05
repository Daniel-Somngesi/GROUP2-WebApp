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

  getSchoolEvalutationTop() {
    return this._httpClient.get(
      this.endpointBase.concat("Reporting/SchoolEvaluation/Top"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  getSchoolEvalutationGraph() {
    return this._httpClient.get(
      this.endpointBase.concat("Reporting/SchoolEvaluation/Graph"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
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

  getApplicationsByFilter(payload) {
    return this._httpClient.post(
      this.endpointBase.concat("Reporting/Applications/ByFilter"), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  getBookings(payload) {
    return this._httpClient.post(
      this.endpointBase.concat("Reporting/Bookings"), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  getConsumablesByClass() {
    return this._httpClient.get(
      this.endpointBase.concat("Reporting/Consumables/ByClass"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  getConsumablesByChild() {
    return this._httpClient.get(
      this.endpointBase.concat("Reporting/Consumables/ByChild"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  getWeeklyAttendance() {
    return this._httpClient.get(
      this.endpointBase.concat("Reporting/Attendance/Weekly"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

}
