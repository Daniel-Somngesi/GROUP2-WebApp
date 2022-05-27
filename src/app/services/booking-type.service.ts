import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookingTypeData } from '../Interface/Interface';

const baseUrl = 'https://localhost:44341/api/bookingType';

@Injectable({
  providedIn: 'root'
})

export class BookingTypeService {


  dataChange: BehaviorSubject<BookingTypeData[]> = new BehaviorSubject<BookingTypeData[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  horizontalPosition!: MatSnackBarHorizontalPosition;
  verticalPosition!: MatSnackBarVerticalPosition;

  constructor(private httpClient: HttpClient) { }

  get data(): BookingTypeData[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllBookingTypes(): void {
    this.httpClient.get<BookingTypeData[]>(baseUrl).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
    });
  }

  // ADD, POST METHOD
  addItem(bookingType: BookingTypeData): void {
    this.httpClient.post(baseUrl, bookingType).subscribe(data => {
      this.dialogData = bookingType;
      this.getAllBookingTypes();
      },
      (err: HttpErrorResponse) => {
      alert('Error occurred. Details: ' + err.name + ' ' + err.message);
    });
   }


 // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(`${baseUrl}/${id}`).subscribe(data => {
      this.getAllBookingTypes();
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      }
    );
  }

  getAllTypes():Observable<any> {
    return this.httpClient.get(baseUrl);
  }


  updateItem(bookingType: any): void {
    this.dialogData = bookingType;
   this.httpClient.put(`${baseUrl}/${bookingType.bookingType_ID}`, bookingType).subscribe(data => {
    this.getAllBookingTypes();
   },
   (err: HttpErrorResponse) => {
     alert('Error occurred. Details: ' + err.name + ' ' + err.message);
   });

 }

}
