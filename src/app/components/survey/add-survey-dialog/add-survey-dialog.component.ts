import { SurveyService } from './../../../services/survey.service';
import { SurveyData } from './../../../Interface/Interface';

import { HttpClient } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-survey-dialog',
  templateUrl: './add-survey-dialog.component.html',
  styleUrls: ['./add-survey-dialog.component.css']
})
export class AddSurveyDialogComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  surveyForm: any;
  minDate:any = new Date().toISOString().slice(0, 10);


  constructor(public dialogRef: MatDialogRef<AddSurveyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SurveyData,
    public service: SurveyService, private formbulider: FormBuilder,  private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.surveyForm = this.formbulider.group({
      survey_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
      survey_StartDate: ['', [Validators.required]],
      survey_EndDate: ['', [Validators.required ]],
    })
  }
    onNoClick(): void {
      this.dialogRef.close();
    }

    public confirmAdd(): void {
      const survey = this.surveyForm.value;
      this.service.addItem(this.data);
    }

  }

