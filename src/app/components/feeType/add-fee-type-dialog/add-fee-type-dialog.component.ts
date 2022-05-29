import { FeeTypeData } from './../../../Interface/Interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FeeTypeService } from 'src/app/services/fee-type.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-fee-type-dialog',
  templateUrl: './add-fee-type-dialog.component.html',
  styleUrls: ['./add-fee-type-dialog.component.css']
})
export class AddFeeTypeDialogComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  feeType: any;
  feeTypeForm: any;

  constructor(public dialogRef: MatDialogRef<AddFeeTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FeeTypeData,
    public service: FeeTypeService, private formbulider: FormBuilder,  private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
      this.feeTypeForm = this.formbulider.group({
        feeType_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
        feeType_Description: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],

      })
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    public confirmAdd(): void {
      const _feeType = this.feeTypeForm.value;
      this.service.addItem(this.data);
      this.SavedSuccessful(1);

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
