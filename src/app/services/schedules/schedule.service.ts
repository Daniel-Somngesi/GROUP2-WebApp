import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  endpointBase = environment.apiUrl;
  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }

  constructor(private _httpClient: HttpClient) {
  }

  getAll() {
    return this._httpClient.get(
      this.endpointBase.concat("Schedule/All"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  getAllEntriesByYear(academicYear: string) {
    return this._httpClient.get(
      this.endpointBase.concat("Schedule/Entries/" + academicYear),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  create(payload: any) {
    return this._httpClient.post(
      this.endpointBase.concat("Schedule/Create"), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  update(id: number, payload: any) {
    return this._httpClient.put(
      this.endpointBase.concat("Schedule/Update/" + id), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  delete(id: number) {
    return this._httpClient.delete(
      this.endpointBase.concat("Schedule/" + id),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }
}
