import { ConsumablesService } from './../../../services/consumables.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-consumables-dialog',
  templateUrl: './delete-consumables-dialog.component.html',
  styleUrls: ['./delete-consumables-dialog.component.css']
})
export class DeleteConsumablesDialogComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialogRef: MatDialogRef<DeleteConsumablesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public service: ConsumablesService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.service.deleteItem(this.data.consumable_Id);

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
      this._snackBar.open('Record Saved Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 2) {
      this._snackBar.open('Record Deleted Successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

}
