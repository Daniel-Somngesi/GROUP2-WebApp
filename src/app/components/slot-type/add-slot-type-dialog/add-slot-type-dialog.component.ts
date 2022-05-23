import { SlotTypeService } from './../../../services/slot-type.service';
import { SlotTypeData } from './../../../Interface/Interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-slot-type-dialog',
  templateUrl: './add-slot-type-dialog.component.html',
  styleUrls: ['./add-slot-type-dialog.component.css']
})
export class AddSlotTypeDialogComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  slottype: any;
  slotTypeForm: any;

  constructor(public dialogRef: MatDialogRef<AddSlotTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SlotTypeData,
    public service: SlotTypeService, private formbulider: FormBuilder,  private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
      this.slotTypeForm = this.formbulider.group({
        Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
      })
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    public confirmAdd(): void {
      const _medicalaidtype = this.slotTypeForm.value;
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
