import { BookingTypeData } from 'src/app/Interface/Interface';
import { BookingTypeService } from './../../../services/booking-type.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-booking-type',
  templateUrl: './delete-booking-type.component.html',
  styleUrls: ['./delete-booking-type.component.css']
})
export class DeleteBookingTypeComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition | undefined;
  verticalPosition: MatSnackBarVerticalPosition | undefined;

  constructor(public dialogRef: MatDialogRef<DeleteBookingTypeComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
   public service: BookingTypeService,
   private _snackBar: MatSnackBar,
   
   ) { }

  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

 
  confirmDelete(): void {
    this.service.deleteItem(this.data.bookingType_ID);
    this.SavedSuccessful(2);
    this.dialogRef.close();
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
