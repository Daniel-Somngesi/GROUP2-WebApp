import { EmployeeTypeData } from './../../../Interface/Interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { EmployeeTypeService } from 'src/app/services/employee-type.service';
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-add-employee-type-dialog',
  templateUrl: './add-employee-type-dialog.component.html',
  styleUrls: ['./add-employee-type-dialog.component.css']
})
export class AddEmployeeTypeDialogComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  employeeType: any;
  employeeTypeForm: any;
 

  constructor(public dialogRef: MatDialogRef<AddEmployeeTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeTypeData,
    public service: EmployeeTypeService, private formbulider: FormBuilder,  private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
      this.employeeTypeForm = this.formbulider.group({
        employeeType_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
        employeeType_Description: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],
       
      })
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
  
    public confirmAdd(): void {
      const _employeeType = this.employeeTypeForm.value;
      this.service.addItem(this.data);
  
    }

    SavedSuccessful(isUpdate:any) {
      if (isUpdate == 0) {
        this._snackBar.open('Record Updated Successfully!', 'Close', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      else if (isUpdate == 1) {
        this._snackBar.open('Record Added Successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      else if (isUpdate == 2) {
        this._snackBar.open('Record Deleted Successfully!', 'Close', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      }
  
}

