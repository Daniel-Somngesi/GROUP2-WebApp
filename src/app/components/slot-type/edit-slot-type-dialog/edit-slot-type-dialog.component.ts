import { SlotTypeService } from './../../../services/slot-type.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-slot-type-dialog',
  templateUrl: './edit-slot-type-dialog.component.html',
  styleUrls: ['./edit-slot-type-dialog.component.css']
})
export class EditSlotTypeDialogComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  slotTypeForm: any;

  constructor(public service: SlotTypeService,private _snackBar: MatSnackBar,
    private formbulider: FormBuilder, public dialog: MatDialogRef<EditSlotTypeDialogComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.slotTypeForm = this.formbulider.group({
      Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(30)]],
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
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 1) {
      this._snackBar.open('Record Saved Successfully!', 'Close', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 2) {
      this._snackBar.open('Record Deleted Successfully!', 'Close', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

}
