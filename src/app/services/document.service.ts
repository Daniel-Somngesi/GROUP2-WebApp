import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { DocumentData } from '../Interface/Interface';

const baseUrl = 'https://localhost:44341/api/Document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  dataChange: BehaviorSubject<DocumentData[]> = new BehaviorSubject<DocumentData[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  horizontalPosition!: MatSnackBarHorizontalPosition;
  verticalPosition!: MatSnackBarVerticalPosition;

  constructor(private httpClient: HttpClient) { }

  get data(): DocumentData[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllDocuments(): void {
    this.httpClient.get<DocumentData[]>(baseUrl).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
    });
  }

  // ADD, POST METHOD
  addItem(document: DocumentData): void {

    this.httpClient.post(baseUrl, document).subscribe(data => {
      this.dialogData = document;
      this.getAllDocuments();
      },
      (err: HttpErrorResponse) => {
      alert('Error occurred. Details: ' + err.name + ' ' + err.message);
    });
   }

  deleteItem(id: number): void {
    this.httpClient.delete(`${baseUrl}/${id}`).subscribe(data => {
      this.getAllDocuments()
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      }
    );
  }

  updateItem(document: any): void {
    document.employee_Id = 1;
    this.dialogData = document;
   this.httpClient.put(`${baseUrl}/${document.document_Id}`, document).subscribe(data => {
    this.getAllDocuments()
   },
   (err: HttpErrorResponse) => {
     alert('Error occurred. Details: ' + err.name + ' ' + err.message);
   });
 }
}
