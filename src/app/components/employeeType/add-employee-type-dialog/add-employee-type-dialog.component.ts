import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpEventType } from '@angular/common/http';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { EmployeeTypeService } from 'src/app/services/employee-types/employee-type.service';

@Component({
  selector: 'app-add-employee-type-dialog',
  templateUrl: './add-employee-type-dialog.component.html',
  styleUrls: ['./add-employee-type-dialog.component.css']
})
export class AddEmployeeTypeDialogComponent implements OnInit {
  displayProgressSpinner = false;

  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEmployeeTypeDialogComponent>,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _employeeTypeService: EmployeeTypeService,
  ) { }

  ngOnInit(): void {
    this._buildForm();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.openSnackBar("Provide all required input", "Error");
    }
    else {
      this._employeeTypeService.create(this.form.value)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Add Employee Type", "Success");
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
      Name: ['', [Validators.required]],
      Description: ['', [Validators.required]],
    });
  }

  get Name() { return this.form.get('Name'); }
  get Description() { return this.form.get('Description'); }
}
