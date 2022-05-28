import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { SurveyData } from '../Interface/Interface';

const baseUrl = 'https://localhost:44341/api/Survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  dataChange: BehaviorSubject<SurveyData[]> = new BehaviorSubject<SurveyData[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  horizontalPosition!: MatSnackBarHorizontalPosition;
  verticalPosition!: MatSnackBarVerticalPosition;

  constructor(private httpClient: HttpClient) { }

  get data(): SurveyData[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllSurveys(): void {
    this.httpClient.get<SurveyData[]>(baseUrl).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
    });
  }

  // ADD, POST METHOD
  addItem(survey: SurveyData): void {
    this.httpClient.post(baseUrl, survey).subscribe(data => {
      this.dialogData = survey;
      this.getAllSurveys();
      },
      (err: HttpErrorResponse) => {
      alert('Error occurred. Details: ' + err.name + ' ' + err.message);
    });
   }

  deleteItem(id: number): void {
    this.httpClient.delete(`${baseUrl}/${id}`).subscribe(data => {
      this.getAllSurveys()
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
      }
    );
  }

  updateItem(survey: any): void {
    this.dialogData = survey;
   this.httpClient.put(`${baseUrl}/${survey.survey_Id}`, survey).subscribe(data => {
    this.getAllSurveys()
   },
   (err: HttpErrorResponse) => {
     alert('Error occurred. Details: ' + err.name + ' ' + err.message);
   });
 }
}
