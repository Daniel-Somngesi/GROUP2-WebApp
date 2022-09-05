import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  endpointBase = environment.apiUrl;
  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }

  constructor(private _httpClient: HttpClient) {
  }

  getAll() {
    return this._httpClient.get(
      this.endpointBase.concat("Enrollments"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  enroll(payload: any) {
    return this._httpClient.post(
      this.endpointBase.concat("Enrollments"), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  update(id: number, payload: any) {
    return this._httpClient.put(
      this.endpointBase.concat("Enrollments/" + id), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  delete(childId: number) {
    return this._httpClient.delete(
      this.endpointBase.concat("Enrollments/" + childId),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }
}
