import { EmployeeService } from 'src/app/services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeType } from 'src/app/Interface/employe-type.types';
import { Employee } from 'src/app/Interface/employee.types';
import { EmployeeTypeService } from 'src/app/services/employee-types/employee-type.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { User } from 'src/app/models';

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})

export class AddDialogComponent {
  displayProgressSpinner = false;
  types: EmployeeType[] = [];

  form: FormGroup;

  record: User;
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _employeeTypeService: EmployeeTypeService,
    private _employeeService: EmployeeService
  ) {
    this.record = dataFromParent.record as User;
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
      this.Email.enable();
      this.PhoneNumber.enable();
      this._employeeService.create(this.form.value)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Create Employee Profile", "Success");
              this.closeDialog();
            }
          },
          error: (error) => {
            this._disableFormControls();
            this.displayProgressSpinner = false;
            this._openErrorMessageSnackBar(error.error.message);
          },
          complete: () => {
            this._disableFormControls();
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
        Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],
        Surname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],
        Email: [this.record.username, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$")]],
        PhoneNumber: [this.record.phoneNumber, [Validators.required, Validators.pattern("^((\\+27-?)|0)?[0-9]{9}$")]],
        IdNumber: ['', [Validators.required, Validators.pattern("^[0-9]{13}$")]],
        Gender: ['', [Validators.required]],
        Type: ['', [Validators.required]],

        AddressLine1: ['', [Validators.required, Validators.maxLength(50)]],
        AddressLine2: ['', [Validators.maxLength(50)]],
        City: ['', [Validators.required, Validators.maxLength(50)]],
        postalCode: ['', [Validators.required, Validators.pattern("^[0-9]{4}$")]],
      })

      this._disableFormControls();
    }
    else {
      this.openSnackBar("Could not initialise component", "Error");
    }

  }

  private _disableFormControls() {
    this.Email.disable();
    this.PhoneNumber.disable();
  }

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
