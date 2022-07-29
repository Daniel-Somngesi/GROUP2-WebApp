import { CalendarEvent } from 'angular-calendar';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { iEvent } from '../Interface/Interface';
import { catchError } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

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

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) { }

  getAllEvents(): Observable<iEvent[]> {
    return this.httpClient.get<iEvent[]>(apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  createEvent(event:iEvent): void {
    this.httpClient.post(apiURL, event).subscribe(data => {
      alert('Event Added Successfully!')
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

  deleteEvent(id:any){
    this.httpClient.delete(`${apiURL}/${id}`).subscribe(data => {
      this.SavedSuccessful(2);
    },
    (err: HttpErrorResponse) => {
    alert('Error occurred. Details: ' + err.name + ' ' + err.message);
    })
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

 SavedSuccessful(isUpdate:any) {
  if (isUpdate == 0) {
    this._snackBar.open('Record Updated Successfully!', 'Close', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  else if (isUpdate == 1) {
    this._snackBar.open('Event Created Successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  else if (isUpdate == 2) {
    this._snackBar.open('Event Deleted Successfully!', 'Close', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
}
