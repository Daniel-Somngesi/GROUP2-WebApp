import { ConsumablesData } from './../../../Interface/Interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ConsumablesService } from 'src/app/services/consumables.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-consumables-dialog',
  templateUrl: './add-consumables-dialog.component.html',
  styleUrls: ['./add-consumables-dialog.component.css']
})
export class AddConsumablesDialogComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  userRole: any;
  consumablesForm: any;

  constructor(public dialogRef: MatDialogRef<AddConsumablesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConsumablesData,
    public service: ConsumablesService, private formbulider: FormBuilder,  private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.consumablesForm = this.formbulider.group({
      Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
      Description: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],
      Quantity: ['', [Validators.required]],
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const _medicalaidtype = this.consumablesForm.value;
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