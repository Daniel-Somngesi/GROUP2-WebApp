import { EmployeeTypeData } from './../Interface/Interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


const baseUrl = 'https://localhost:44341/api/EmployeeType';

@Injectable()
export class EmployeeTypeService {

  dataChange: BehaviorSubject<EmployeeTypeData[]> = new BehaviorSubject<EmployeeTypeData[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  horizontalPosition!: MatSnackBarHorizontalPosition;
  verticalPosition!: MatSnackBarVerticalPosition;

  constructor(private httpClient: HttpClient) { }

  get data(): EmployeeTypeData[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllEmployeeTypes(): void {
    this.httpClient.get<EmployeeTypeData[]>(baseUrl).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
    });
  }

  // ADD, POST METHOD
  addItem(employeeType: EmployeeTypeData): void {
    this.httpClient.post(baseUrl, employeeType).subscribe(data => {
      this.dialogData = employeeType;

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


  updateItem(employeeType: any): void {
    this.dialogData = employeeType;
   this.httpClient.put(`${baseUrl}/${employeeType.employeeType_ID}`, employeeType).subscribe(data => {
   },
   (err: HttpErrorResponse) => {
     alert('Error occurred. Details: ' + err.name + ' ' + err.message);
   });
 }
}
