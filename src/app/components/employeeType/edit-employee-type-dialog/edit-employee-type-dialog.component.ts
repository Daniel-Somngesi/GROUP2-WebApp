import { EmployeeTypeService } from './../../../services/employee-type.service';
import { EmployeeTypeData } from './../../../Interface/Interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-employee-type-dialog',
  templateUrl: './edit-employee-type-dialog.component.html',
  styleUrls: ['./edit-employee-type-dialog.component.css']
})
export class EditEmployeeTypeDialogComponent implements OnInit {
  employeeTypeForm: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public service: EmployeeTypeService,private _snackBar: MatSnackBar,
    private formbulider: FormBuilder, public dialog: MatDialogRef<EditEmployeeTypeDialogComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any) { }


   ngOnInit(): void {
    this.employeeTypeForm = this.formbulider.group({
      employeeType_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],
      employeeType_Description: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],
    })
  }

  
  stopEdit(): void {
    this.service.updateItem(this.data);
    this.SavedSuccessful(0);
  }

  onNoClick(): void {
    this.dialog.close();
  }

  SavedSuccessful(isUpdate:any) {
    if (isUpdate == 0) {
      this._snackBar.open('Record Updated Successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }

    else if (isUpdate == 1) {
      this._snackBar.open('Record Saved Successfully!', 'Close', {
        duration: 2000,
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
