import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmployeeData } from '../Interface/Interface';

const baseUrl = 'https://localhost:44341/api/Employee/';
const _baseUrl = 'https://localhost:44341/api/EmployeeType';

@Injectable(
)
export class EmployeeService {
  create(employee: EmployeeData) {
    throw new Error('Method not implemented.');
  }

  dataChange: BehaviorSubject<EmployeeData[]> = new BehaviorSubject<EmployeeData[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  horizontalPosition!: MatSnackBarHorizontalPosition;
  verticalPosition!: MatSnackBarVerticalPosition;

  constructor(private httpClient: HttpClient) { }

  get data(): EmployeeData[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData.value;
  }

  getAllEmployees(): void {
    this.httpClient.get<EmployeeData[]>(baseUrl).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
    });
  }

  // ADD, POST METHOD
  addItem(employee: EmployeeData): void {
    this.httpClient.post(baseUrl, employee).subscribe(data => {
      this.dialogData = baseUrl;
      },
      (err: HttpErrorResponse) => {
      alert('Error occurred. Details: ' + err.name + ' ' + err.message);
    });
   }

   updateItem(employee: EmployeeData): void {
    this.dialogData = employee;
  }

   /*/ UPDATE, PUT METHOD
   updateItem(employee: EmployeeData): void {
    this.httpClient.put(baseUrl + employee.employee_Id, employee).subscribe(data => {
        this.dialogData = employee;
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      }
    );
  }*/
  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(baseUrl + id).subscribe(data => {
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      }
    );
  }

  getAllTypes():Observable<any> {
    return this.httpClient.get(_baseUrl);
  }

}
