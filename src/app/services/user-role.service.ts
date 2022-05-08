import { UserRoleData } from './../Interface/Interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


const baseUrl = 'https://localhost:44341/api/UserRole';

@Injectable()
export class UserRoleService {

  dataChange: BehaviorSubject<UserRoleData[]> = new BehaviorSubject<UserRoleData[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  horizontalPosition!: MatSnackBarHorizontalPosition;
  verticalPosition!: MatSnackBarVerticalPosition;

  constructor(private httpClient: HttpClient) { }

  get data(): UserRoleData[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllUserRoles(): void {
    this.httpClient.get<UserRoleData[]>(baseUrl).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
    });
  }

  // ADD, POST METHOD
  addItem(userrole: UserRoleData): void {
    this.httpClient.post(baseUrl, userrole).subscribe(data => {
      this.dialogData = userrole;

      },
      (err: HttpErrorResponse) => {
      alert('Error occurred. Details: ' + err.name + ' ' + err.message);
    });
    this.getAllUserRoles();
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
    this.httpClient.delete(`${baseUrl}/${id}`).subscribe(data => {
      this.getAllUserRoles();
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      }
    );
    this.getAllUserRoles();
  }


  /*update(data:any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/${data.id}`, data);

  }*/

  updateItem(userrole: any): void {
    this.dialogData = userrole;
   this.httpClient.put(`${baseUrl}/${userrole.userRole_Id}`, userrole).subscribe(data => {
    this.getAllUserRoles();
   },
   (err: HttpErrorResponse) => {
     alert('Error occurred. Details: ' + err.name + ' ' + err.message);
   });
   this.getAllUserRoles();
 }
}
