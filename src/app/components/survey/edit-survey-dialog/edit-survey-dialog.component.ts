import { SurveyService } from './../../../services/survey.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-survey-dialog',
  templateUrl: './edit-survey-dialog.component.html',
  styleUrls: ['./edit-survey-dialog.component.css']
})
export class EditSurveyDialogComponent implements OnInit {

  surveyForm: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  minDate:any = new Date().toISOString().slice(0, 10);
  start:any;
  end:any;

  constructor(public service: SurveyService,private _snackBar: MatSnackBar,
    private formbulider: FormBuilder, public dialog: MatDialogRef<EditSurveyDialogComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.surveyForm = this.formbulider.group({
      survey_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
      survey_StartDate: ['', [Validators.required]],
      survey_EndDate: ['', [Validators.required ]],
    })
  }

  stopEdit(): void {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    var day = new Date(this.start);
    var d = day.getDate() + 1;
    var m = month[(day.getMonth())];
    var y = day.getFullYear();
    var date = new Date(d  + "-" + m + "-" + y);
    this.data.startDate = date;

    var day1 = new Date(this.end);
    var d1 = day1.getDate() + 1;
    var m1 = month[(day1.getMonth())];
    var y1 = day1.getFullYear();
    var date1 = new Date(d1  + "-" + m1 + "-" + y1);
    this.data.endDate = date1;
    this.service.updateItem(this.data);
    this.SavedSuccessful(0);
  }

  onNoClick(): void {
    this.dialog.close();
  }

  SavedSuccessful(isUpdate:any) {
    if (isUpdate == 0) {
      this._snackBar.open('Record Updated Successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 1) {
      this._snackBar.open('Record Saved Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 2) {
      this._snackBar.open('Record Deleted Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

}
