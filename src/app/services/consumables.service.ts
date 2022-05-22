import { ConsumablesData } from './../Interface/Interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

const baseUrl = 'https://localhost:44341/api/Consumable';

@Injectable({
  providedIn: 'root'
})
export class ConsumablesService {

  dataChange: BehaviorSubject<ConsumablesData[]> = new BehaviorSubject<ConsumablesData[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  horizontalPosition!: MatSnackBarHorizontalPosition;
  verticalPosition!: MatSnackBarVerticalPosition;

  constructor(private httpClient: HttpClient) { }

  get data(): ConsumablesData[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllConsumables(): void {
    this.httpClient.get<ConsumablesData[]>(baseUrl).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
    });
  }

  // ADD, POST METHOD
  addItem(consumable: ConsumablesData): void {
    this.httpClient.post(baseUrl, consumable).subscribe(data => {
      this.dialogData = consumable;
      this.getAllConsumables();
      },
      (err: HttpErrorResponse) => {
      alert('Error occurred. Details: ' + err.name + ' ' + err.message);
    });
   }

  deleteItem(id: number): void {
    this.httpClient.delete(`${baseUrl}/${id}`).subscribe(data => {
      this.getAllConsumables()
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      }
    );
  }

  updateItem(consumable: any): void {
    this.dialogData = consumable;
   this.httpClient.put(`${baseUrl}/${consumable.consumable_Id}`, consumable).subscribe(data => {
    this.getAllConsumables()
   },
   (err: HttpErrorResponse) => {
     alert('Error occurred. Details: ' + err.name + ' ' + err.message);
   });
 }
}
