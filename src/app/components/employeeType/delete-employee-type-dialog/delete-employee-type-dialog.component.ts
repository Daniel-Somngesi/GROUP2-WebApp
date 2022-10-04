import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeType } from 'src/app/Interface/employee.types';
import { EmployeeTypeService } from 'src/app/services/employee-types/employee-type.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-delete-employee-type-dialog',
  templateUrl: './delete-employee-type-dialog.component.html',
  styleUrls: ['./delete-employee-type-dialog.component.css']
})
export class DeleteEmployeeTypeDialogComponent implements OnInit {
  displayProgressSpinner = false;
  record: EmployeeType;
  constructor(
    public dialogRef: MatDialogRef<DeleteEmployeeTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _matSnackBar: MatSnackBar,
    private _employeeTypeService: EmployeeTypeService
  ) {
    this.record = dataFromParent.record as EmployeeType;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this._employeeTypeService.delete(this.record.id)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            this.displayProgressSpinner = false;

            this.openSnackBar("Delete Employee Type Service", "Success");
            this.closeDialog();
          }
        },
        error: (error) => {
          window.location.reload()
          this.displayProgressSpinner = false;
          this._openErrorMessageSnackBar(error.error.message);
        },
        complete: () => {
          window.location.reload()
          this.displayProgressSpinner = false;
        }
      });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
    window.location.reload()
  }

  openSnackBar(message: string, action: string) {
    this._matSnackBar.open(message, action, {
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
}
