import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeType } from 'src/app/Interface/employe-type.types';
import { Employee } from 'src/app/Interface/employee.types';
import { EmployeeTypeService } from 'src/app/services/employee-types/employee-type.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  displayProgressSpinner = false;
  types: EmployeeType[] = [];

  form: FormGroup;

  record: Employee;
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _employeeTypeService: EmployeeTypeService,
    private _employeeService: EmployeeService
  ) {
    this.record = dataFromParent.record as Employee;
  }

  ngOnInit(): void {
    this._getTypesFromServer();
  }

  private _getTypesFromServer() {
    this._employeeTypeService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            let res = event.body as EmployeeType[];
            this.types = res;
            this.displayProgressSpinner = false;

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

  onSubmit() {
    if (this.form.invalid) {
      this.openSnackBar("Provide all required input", "Error");
    }
    else {
      this._employeeService.update(this.record.id, this.form.value)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Update Employee", "Success");
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
    if (this.record != null) {
      this.form = this._formBuilder.group({
        Name: [this.record.name, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],
        Surname: [this.record.surname, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],
        Email: [this.record.email, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$")]],
        PhoneNumber: [this.record.phoneNumber, [Validators.required, Validators.pattern("^((\\+27-?)|0)?[0-9]{9}$")]],
        IdNumber: [this.record.idNumber, [Validators.required, Validators.pattern("^[0-9]{13}$")]],
        Gender: [this.record.gender, [Validators.required]],
        Type: [this.record.employeeTypeId, [Validators.required]],

        AddressLine1: [this.record.addressLine1, [Validators.required, Validators.maxLength(50)]],
        AddressLine2: [this.record.addressLine2, [Validators.maxLength(50)]],
        City: [this.record.city, [Validators.required, Validators.maxLength(50)]],
        postalCode: [this.record.postalCode, [Validators.required, Validators.pattern("^[0-9]{4}$")]],
      })

      this.Email.disable();
      this.PhoneNumber.disable();
    }
    else {
      this.openSnackBar("Could not initialise component", "Error");
    }

  }

  // getDob() {
  //   let Year: any = this.record.idNumber.substring(0, 2);
  //   let Month = this.record.idNumber.substring(2, 4);
  //   let Day = this.record.idNumber.substring(4, 6);
  //   let cutoff: any = (new Date()).getFullYear() - 2000
  //   var dob = (Year > cutoff ? '19' : '20') + Year + '-' + Month + '-' + Day;
  //   this.Dob = dob;
  // }

  get Name() { return this.form.get('Name'); }
  get Surname() { return this.form.get('Surname'); }
  get Email() { return this.form.get('Email'); }
  get PhoneNumber() { return this.form.get('PhoneNumber'); }
  get Gender() { return this.form.get('Gender'); }
  get IdNumber() { return this.form.get('IdNumber'); }
  get Type() { return this.form.get('Type'); }

  get AddressLine1() { return this.form.get('AddressLine1'); }
  get AddressLine2() { return this.form.get('AddressLine2'); }
  get City() { return this.form.get('City'); }
  get postalCode() { return this.form.get('postalCode'); }
}
