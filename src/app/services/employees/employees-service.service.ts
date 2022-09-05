import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService{


  endpointBase = environment.apiUrl;
  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }

  constructor(private _httpClient: HttpClient) {
  }

  getTeachers() {
    return this._httpClient.get(
      this.endpointBase.concat("Employee/Teachers"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

}
