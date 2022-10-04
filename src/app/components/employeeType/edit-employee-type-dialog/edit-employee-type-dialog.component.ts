import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { EmployeeTypeService } from 'src/app/services/employee-types/employee-type.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { AddEmployeeTypeDialogComponent } from '../add-employee-type-dialog/add-employee-type-dialog.component';
import { EmployeeType } from 'src/app/Interface/employee.types';
@Component({
  selector: 'app-edit-employee-type-dialog',
  templateUrl: './edit-employee-type-dialog.component.html',
  styleUrls: ['./edit-employee-type-dialog.component.css']
})
export class EditEmployeeTypeDialogComponent implements OnInit {
  displayProgressSpinner = false;

  form: FormGroup;
  record: EmployeeType;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditEmployeeTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _employeeTypeService: EmployeeTypeService,
  ) {
    this.record = dataFromParent.record as EmployeeType;
  }

  ngOnInit(): void {
    this._buildForm();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.openSnackBar("Provide all required input", "Error");
    }
    else {
      this._employeeTypeService.update(this.record.id, this.form.value)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Update Employee Type", "Success");
              this.closeDialog();
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
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  private _openErrorMessageSnackBar(errorMessage: string) {
    const snackBar = this._matSnackBar.openFromComponent(CustomErrorSnackBarComponent, {
      data: {
        preClose: () => { snackBar.dismiss() },
        parent: errorMessage
      }
    });
  }

  private _buildForm() {
    this.form = this._formBuilder.group({
      Name: [this.record.name, [Validators.required]],
      Description: [this.record.description, [Validators.required]],
    });
  }

  get Name() { return this.form.get('Name'); }
  get Description() { return this.form.get('Description'); }
}
