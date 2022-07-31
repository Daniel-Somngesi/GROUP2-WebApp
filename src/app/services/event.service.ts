import { CalendarEvent } from 'angular-calendar';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { iEvent } from '../Interface/Interface';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const apiURL = environment.apiUrl + 'Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAllEvents(): Observable<iEvent[]> {
    return this.httpClient.get<iEvent[]>(apiURL)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // createEvent(event: iEvent): void {
  //   console.log(event);
  //   this.httpClient.post(apiURL, event).subscribe(data => {
  //   },
  //     (err: HttpErrorResponse) => {
  //       alert('Error occurred. Details: ' + err.name + ' ' + err.message);
  //     })

  // }

  createEvent(payload) {
    return this.httpClient
      .post(apiURL.concat("/New"), payload, { reportProgress: true, observe: 'events' });
  }


  findEvent(eventId: number): Observable<any> {
    return this.httpClient.get<iEvent>(apiURL + '/' + eventId)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateEvent(eventId: number, event: any): Observable<any> {
    return this.httpClient.put<iEvent>(apiURL + '/' + event, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  deleteEvent(id: any) {
    this.httpClient.delete(`${apiURL}/${id}`).subscribe(data => {
    },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      })
  }


  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
