import { FeeData } from './../Interface/Interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


const baseUrl = 'https://localhost:44341/api/Fee';
const _baseUrl = 'https://localhost:44341/api/FeeType';

@Injectable()
export class FeeService {

  dataChange: BehaviorSubject<FeeData[]> = new BehaviorSubject<FeeData[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  horizontalPosition!: MatSnackBarHorizontalPosition;
  verticalPosition!: MatSnackBarVerticalPosition;

  constructor(private httpClient: HttpClient) { }

  get data(): FeeData[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllFees(): void {
    this.httpClient.get<FeeData[]>(baseUrl).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
    });
  }

  getFeeTypeById(id:any): Observable<any> {
    return this.httpClient.get(`${_baseUrl}/${id}`);
  }

  getAllFeeTypes():Observable<any> {
    return this.httpClient.get(_baseUrl);
  }

  // ADD, POST METHOD
  addItem(fee: FeeData): void {
    this.httpClient.post(baseUrl, fee).subscribe(data => {
      this.dialogData = fee;

      },
      (err: HttpErrorResponse) => {
      alert('Error occurred. Details: ' + err.name + ' ' + err.message);
    });
   }

  deleteItem(id: number): void {
    this.httpClient.delete(`${baseUrl}/${id}`).subscribe(data => {
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      }
    );
  }

  updateItem(fee: any): void {
    this.dialogData = fee;
   this.httpClient.put(`${baseUrl}/${fee.fee_Id}`, fee).subscribe(data => {
   },
   (err: HttpErrorResponse) => {
     alert('Error occurred. Details: ' + err.name + ' ' + err.message);
   });
 }
}
