import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Surburb } from '../models/surburb';
import { City } from '../models/city';
import { Country } from '../models/country';
import { Province } from '../models/province';

const baseUrl = 'https://localhost:44341/api';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = 'https://localhost:44341/api';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllUserRoles(): Promise<any> {
    return this.http.get(this.baseUrl + '/userRole').toPromise();
  }

}
