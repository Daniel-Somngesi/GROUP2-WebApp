import { BookingTypeService } from './../../../services/booking-type.service';
import { BookingTypeData } from 'src/app/Interface/Interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-booking-type',
  templateUrl: './add-booking-type.component.html',
  styleUrls: ['./add-booking-type.component.css']
})

export class AddBookingTypeComponent  {
  bookingTypeForm:any;
  bookingTypes:any;
  bookingTypeID = null;
  mySelect:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialogRef: MatDialogRef<AddBookingTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BookingTypeData,
     public service: BookingTypeService, private formbulider: FormBuilder,  private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
      this.bookingTypeForm = this.formbulider.group({
        bookingType_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
        bookingType_Description: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],
      })
      this.retrieveBookingTypes();
    }


    retrieveBookingTypes(): void {
      this.service.getAllTypes()
        .subscribe(
          data => {
            this.bookingTypes = data;
        }
        );}

        onNoClick(): void {
          this.dialogRef.close();
        }
      
        public confirmAdd(): void {
          const _bookingType = this.bookingTypeForm.value;
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