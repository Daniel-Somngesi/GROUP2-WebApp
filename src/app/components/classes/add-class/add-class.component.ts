import { KeyValue } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeyValueType } from 'src/app/Interface/Interface';
import { ClassService } from 'src/app/services/class/class.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeesService } from 'src/app/services/employees/employees-service.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
  displayProgressSpinner = false;

  form: FormGroup;

  teachers: KeyValueType[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddClassComponent>,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _classService: ClassService,
    private _employeesService: EmployeesService
  ) { }

  ngOnInit(): void {
    this._getTeachers();

  }

  onSubmit() {
    if (this.form.invalid) {
      this.openSnackBar("Provide all required input", "Error");
    }
    else {
      this._classService.create(this.form.value)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Add Class", "Success");
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

  private _buildForm(formFb: FormBuilder) {
    this.form = formFb.group({
      Name: ['', [Validators.required]],
      EmployeeId: ['', [Validators.required]],
    });
  }

  private _getTeachers() {
    this._employeesService.getTeachers()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as KeyValueType[];
            this.teachers = res;
            console.log(this.teachers);
            this._buildForm(this._formBuilder);
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

  get Name() { return this.form.get('Name'); }
  get EmployeeId() { return this.form.get('EmployeeId'); }
}
