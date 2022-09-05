import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Child } from 'src/app/Interface/child.types';
import { Class } from 'src/app/Interface/class.types';
import { KeyValueType } from 'src/app/Interface/Interface';
import { ClassService } from 'src/app/services/class/class.service';
import { EmployeesService } from 'src/app/services/employees/employees-service.service';
import { EnrollmentService } from 'src/app/services/enrollment/enrollment.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-add-enrollment',
  templateUrl: './add-enrollment.component.html',
  styleUrls: ['./add-enrollment.component.css']
})
export class AddEnrollmentComponent implements OnInit {
  displayProgressSpinner = false;

  form: FormGroup;

  classes: Class[] = [];
  record: Child;
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEnrollmentComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _classService: ClassService,
    private _enrollmentService: EnrollmentService
  ) {
    this.record = dataFromParent.record as Child
  }

  ngOnInit(): void {
    this._getClasses();
  }

  onSubmit() {
    this.ChildId.setValue(this.record.id);
    if (this.form.invalid) {
      this.openSnackBar("Provide all required input", "Error");
    }
    else {
      this._enrollmentService.enroll(this.form.value)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Child enrolled to class", "Success");
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
      Name: [this.record.name + " " + this.record.surname, [Validators.required]],
      Age: [this.record.age, [Validators.required]],
      ChildId: [''],
      ClassId: ['', [Validators.required]],
    });

    this.Name.disable();
    this.Age.disable();
  }

  get Name() { return this.form.get('Name'); }
  get Age() { return this.form.get('Age'); }
  get ClassId() { return this.form.get('ClassId'); }
  get ChildId() { return this.form.get('ChildId'); }
}
