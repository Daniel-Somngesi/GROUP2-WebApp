import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GenerateApplicationsReportComponent } from '../../applications-reporting/generate-applications-report/generate-applications-report.component';

@Component({
  selector: 'app-generate-bookings-report',
  templateUrl: './generate-bookings-report.component.html',
  styleUrls: ['./generate-bookings-report.component.css']
})
export class GenerateBookingsReportComponent implements OnInit {
  showLoadingEndicator = false;

  generateReportForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) dataFomCallingComponent: any,
    public dialogRef: MatDialogRef<GenerateBookingsReportComponent>,
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

      if (this.ToDate.value < this.FromDate.value) {
        this.openSnackBar("End start should be greater than from date", "Error");
      }
      else {
        localStorage.setItem('bookings-report-from-date', this.FromDate.value);
        localStorage.setItem('bookings-report-to-date', this.ToDate.value);
        this.closeDialog();
        this._router.navigate(['bookings-report']);
      }
    }
  }


  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  private closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  private _buildForm() {
    this.generateReportForm = this._formBuilder.group({
      FromDate: ['', [Validators.required]],
      ToDate: ['', [Validators.required]]
    });
  }

  get FromDate() { return this.generateReportForm.get('FromDate'); }
  get ToDate() { return this.generateReportForm.get('ToDate'); }


}

