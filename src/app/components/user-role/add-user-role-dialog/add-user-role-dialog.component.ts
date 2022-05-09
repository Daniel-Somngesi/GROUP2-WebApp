import { UserRoleService } from './../../../services/user-role.service';
import { UserRoleData } from './../../../Interface/Interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user-role-dialog',
  templateUrl: './add-user-role-dialog.component.html',
  styleUrls: ['./add-user-role-dialog.component.css']
})

export class AddUserRoleDialogComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  userRoleForm: any;
  type: any;

  constructor(public dialogRef: MatDialogRef<AddUserRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserRoleData,
    public service: UserRoleService, private formbulider: FormBuilder,  private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userRoleForm = this.formbulider.group({
      userRole_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],
    })
  }

      onNoClick(): void {
        this.dialogRef.close();
      }

      public confirmAdd(): void {
        const _employee = this.userRoleForm.value;
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
