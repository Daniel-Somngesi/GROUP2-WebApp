import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Class } from 'src/app/Interface/class.types';
import { KeyValueType } from 'src/app/Interface/Interface';
import { ClassService } from 'src/app/services/class/class.service';
import { EmployeesService } from 'src/app/services/employees/employees-service.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { UpdateClassComponent } from '../update-class/update-class.component';

@Component({
  selector: 'app-delete-class',
  templateUrl: './delete-class.component.html',
  styleUrls: ['./delete-class.component.css']
})
export class DeleteClassComponent implements OnInit {
  displayProgressSpinner = false;
  record: Class;
  form: FormGroup;
  teachers: KeyValueType[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateClassComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _classService: ClassService,
    private _employeesService: EmployeesService) {
    this.record = dataFromParent.record as Class;
  }

  ngOnInit(): void {
    this._getTeachers();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.openSnackBar("Provide all required input", "Error");
    }
    else {
      this._classService.delete(this.record.id)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Delete Class", "Success");
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

  private _buildForm(formFb: FormBuilder) {
    this.form = formFb.group({
      Name: [this.record.name, [Validators.required]],
      EmployeeId: [this.record.teacherId, [Validators.required]],
    });

    this.Name.disable();
    this.EmployeeId.disable();
  }

  get Name() { return this.form.get('Name'); }
  get EmployeeId() { return this.form.get('EmployeeId'); }
}
