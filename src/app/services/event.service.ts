import { CalendarEvent } from 'angular-calendar';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { iEvent } from '../Interface/Interface';
import { catchError } from 'rxjs/operators';

const apiURL = 'https://localhost:44341/api/Event';

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

  getAllEvents(): Observable<CalendarEvent[]> {
    return this.httpClient.get<CalendarEvent[]>(apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  createEvent(event:iEvent): void {
    this.httpClient.post(apiURL, event).subscribe(data => {
    },
    (err: HttpErrorResponse) => {
    alert('Error occurred. Details: ' + err.name + ' ' + err.message);
    })

  }


  findEvent(eventId:number): Observable<any> {
    return this.httpClient.get<iEvent>(apiURL + '/' + eventId)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  updateEvent(eventId:number, event:any): Observable<any> {
    return this.httpClient.put<iEvent>(apiURL + '/' + event, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  deleteEvent(eventId:any){
    return this.httpClient.delete<iEvent>(apiURL + '/' + eventId, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
