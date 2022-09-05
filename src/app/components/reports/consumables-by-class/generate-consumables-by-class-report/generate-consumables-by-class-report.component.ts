import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Class } from 'src/app/Interface/class.types';
import { ClassService } from 'src/app/services/class/class.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { ViewConsumablesByClassReportComponent } from '../view-consumables-by-class-report/view-consumables-by-class-report.component';

@Component({
  selector: 'app-generate-consumables-by-class-report',
  templateUrl: './generate-consumables-by-class-report.component.html',
  styleUrls: ['./generate-consumables-by-class-report.component.css']
})
export class GenerateConsumablesByClassReportComponent implements OnInit {
  showLoadingEndicator = false;
  displayProgressSpinner = false;


  generateReportForm: FormGroup;
  classes: Class[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) dataFomCallingComponent: any,
    public dialogRef: MatDialogRef<GenerateConsumablesByClassReportComponent>,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _classService: ClassService
  ) {
  }

  ngOnInit(): void {
    this._getClasses();
  }

  onSubmit() {
    if (this.generateReportForm.valid) {
      localStorage.setItem('consumables-by-class-classId', this.ClassId.value);
      this.closeDialog();
      this._router.navigate(['consumables-by-class-report']);
    }

  }

  private _getClasses() {
    this._classService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Class[];
            this.classes = res;
            this._buildForm();
          }
        },
        error: (error) => {
          this.displayProgressSpinner = false;
          this._openErrorMessageSnackBar(error.error.message);
        },
        complete: () => {
          this.displayProgressSpinner = false;
        }
      });
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  private _openErrorMessageSnackBar(errorMessage: string) {
    const snackBar = this._snackBar.openFromComponent(CustomErrorSnackBarComponent, {
      data: {
        preClose: () => { snackBar.dismiss() },
        parent: errorMessage
      }
    });
  }

  private closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  private _buildForm() {
    this.generateReportForm = this._formBuilder.group({
      ClassId: ['', [Validators.required]]
    });
  }

  get ClassId() { return this.generateReportForm.get('ClassId'); }

}

