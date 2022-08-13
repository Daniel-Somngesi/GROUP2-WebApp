import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iEvent } from 'src/app/Interface/Interface';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';


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
      this.endpointBase.concat("Schedule/Entries/"+ academicYear),
      { reportProgress: true, observe: 'events', headers: this.headers }
      );
  }

  create(payload: any) {
    return this._httpClient.post(
      this.endpointBase.concat("Schedule/Create"), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }
}
