import { MedicalAidTypeData } from './../Interface/Interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

const baseUrl = 'https://localhost:44341/api/UserRole';

@Injectable()
export class MedicalAidTypeService {

  constructor(private httpClient: HttpClient) { }

  dataChange: BehaviorSubject<MedicalAidTypeData[]> = new BehaviorSubject<MedicalAidTypeData[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  horizontalPosition!: MatSnackBarHorizontalPosition;
  verticalPosition!: MatSnackBarVerticalPosition;

  get data(): MedicalAidTypeData[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllUserRoles(): void {
    this.httpClient.get<MedicalAidTypeData[]>(baseUrl).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
    });
  }

  // ADD, POST METHOD
  addItem(medicalaidtype: MedicalAidTypeData): void {
    this.httpClient.post(baseUrl, medicalaidtype).subscribe(data => {
      this.dialogData = medicalaidtype;

      },
      (err: HttpErrorResponse) => {
      alert('Error occurred. Details: ' + err.name + ' ' + err.message);
    });
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
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      }
    );
  }


  /*update(data:any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/${data.id}`, data);

  }*/

  updateItem(medicalaidtype: any): void {
    this.dialogData = medicalaidtype;
   this.httpClient.put(`${baseUrl}/${medicalaidtype.medicalAidTypeId}`, medicalaidtype).subscribe(data => {
   },
   (err: HttpErrorResponse) => {
     alert('Error occurred. Details: ' + err.name + ' ' + err.message);
   });
 }
}
