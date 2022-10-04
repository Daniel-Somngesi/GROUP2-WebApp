import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  endpointBase = environment.apiUrl;
  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }

  constructor(private _httpClient: HttpClient) {
  }

  create(payload) {
    return this._httpClient
      .post(this.endpointBase.concat("Slot"), payload,
        { reportProgress: true, observe: 'events', headers: this.headers });
  }

  getAllGroupedByDays() {
    return this._httpClient.get(
      this.endpointBase.concat("Slot/All/GroupedByDays"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  getAll() {
    return this._httpClient.get(
      this.endpointBase.concat("Slot/All"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  deleteSlot(id: any) {
    this._httpClient.delete(this.endpointBase.concat("Slot/" + id),
      { reportProgress: true, observe: 'events', headers: this.headers })
      .subscribe(data => {
      },
        (err: HttpErrorResponse) => {
          alert('Error occurred. Details: ' + err.name + ' ' + err.message);
        })
  }
}
