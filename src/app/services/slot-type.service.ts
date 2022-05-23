import { SlotTypeData } from './../Interface/Interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const baseUrl = 'https://localhost:44341/api/SlotType';

@Injectable({
  providedIn: 'root'
})
export class SlotTypeService {

  dataChange: BehaviorSubject<SlotTypeData[]> = new BehaviorSubject<SlotTypeData[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  horizontalPosition!: MatSnackBarHorizontalPosition;
  verticalPosition!: MatSnackBarVerticalPosition;

  constructor(private httpClient: HttpClient) { }

  get data(): SlotTypeData[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllSlotTypes(): void {
    this.httpClient.get<SlotTypeData[]>(baseUrl).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
    });
  }

  // ADD, POST METHOD
  addItem(slottype: SlotTypeData): void {
    this.httpClient.post(baseUrl, slottype).subscribe(data => {
      this.dialogData = slottype;
      this.getAllSlotTypes();
      },
      (err: HttpErrorResponse) => {
      alert('Error occurred. Details: ' + err.name + ' ' + err.message);
    });
   }

  deleteItem(id: number): void {
    this.httpClient.delete(`${baseUrl}/${id}`).subscribe(data => {
      this.getAllSlotTypes()
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      }
    );
  }

  updateItem(slottype: any): void {
    this.dialogData = slottype;
   this.httpClient.put(`${baseUrl}/${slottype.slotType_Id}`, slottype).subscribe(data => {
    this.getAllSlotTypes()
   },
   (err: HttpErrorResponse) => {
     alert('Error occurred. Details: ' + err.name + ' ' + err.message);
   });
 }
}
