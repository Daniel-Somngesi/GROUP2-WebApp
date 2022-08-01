import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmployeeData } from '../Interface/Interface';
import { environment } from 'src/environments/environment';


const baseUrl = environment.apiUrl + 'Employee';
const _baseUrl = environment.apiUrl + 'EmployeeType';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

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
    return this.dialogData;
  }

  getEmployeeTypeById(id: any): Observable<any> {
    return this.httpClient.get(`${_baseUrl}/${id}`);
  }

  getAllEmployees(): void {
    this.httpClient.get<EmployeeData[]>(baseUrl).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  // ADD, POST METHOD
  addItem(employee: EmployeeData): void {
    this.httpClient.post(baseUrl, employee).subscribe(data => {
      this.dialogData = employee;
      this.getAllEmployees();
    },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      });
  }

  deleteItem(id: number): void {
    this.httpClient.delete(`${baseUrl}/${id}`).subscribe(data => {
      this.getAllEmployees()
    },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      }
    );
  }

  getAllTypes(): Observable<any> {
    return this.httpClient.get(_baseUrl);
  }



  updateItem(employee: any): void {
    this.dialogData = employee;
    this.httpClient.put(`${baseUrl}/${employee.employee_Id}`, employee).subscribe(data => {
      this.getAllEmployees()
    },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      });
  }

}
