import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-generate-child-attendance-report-dialog',
  templateUrl: './generate-child-attendance-report-dialog.component.html',
  styleUrls: ['./generate-child-attendance-report-dialog.component.css']
})
export class GenerateChildAttendanceReportDialogComponent implements OnInit {
  showLoadingEndicator = false;


  generateReportForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) dataFomCallingComponent: any,
    public dialogRef: MatDialogRef<GenerateChildAttendanceReportDialogComponent>,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this._buildForm();
  }

  onSubmit() {
    if (this.generateReportForm.valid) {
      localStorage.setItem('class-attendance-report-date', this.Date.value);
      this.closeDialog();
      this._router.navigate(['class-attendance-report']);
    }

  }


  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  private closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  private _buildForm() {
    this.generateReportForm = this._formBuilder.group({
      Date: ['', [Validators.required]]
    });
  }

  get Date() { return this.generateReportForm.get('Date'); }


}

