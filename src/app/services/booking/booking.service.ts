import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {


  endpointBase = environment.apiUrl;

  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }

  constructor(private http: HttpClient, private _authService: AuthService) {
    this.http
  }

  makeBooking(payload: any) {
    return this.http.post(
      this.endpointBase.concat("Booking/Make"), payload,
      { observe: 'events', reportProgress: true, headers: this.headers });
  }

  getAllByLoggedInUser() {
    return this.http.get(
      this.endpointBase.concat("Booking/GetAll/ByLoggedInUser"),
      { reportProgress: true, observe: 'events', headers:this.headers }
    );
  }

  delete(bookingId:number) {
    return this.http.delete(
      this.endpointBase.concat("Booking/"+bookingId),
      { reportProgress: true, observe: 'events', headers:this.headers }
    );
  }

}
