import { ConsumablesService } from './../../../services/consumables.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-consumables-dialog',
  templateUrl: './edit-consumables-dialog.component.html',
  styleUrls: ['./edit-consumables-dialog.component.css']
})
export class EditConsumablesDialogComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  consumablesForm: any;

  constructor(public service: ConsumablesService,private _snackBar: MatSnackBar,
    private formbulider: FormBuilder, public dialog: MatDialogRef<EditConsumablesDialogComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.consumablesForm = this.formbulider.group({
      Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
      Description: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],
      Quantity: ['', [Validators.required]],
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