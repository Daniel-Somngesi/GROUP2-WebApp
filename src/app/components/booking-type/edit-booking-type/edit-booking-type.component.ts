import { Component, OnInit ,Inject} from '@angular/core';
import { BookingTypeService } from './../../../services/booking-type.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BookingTypeData } from 'src/app/Interface/Interface';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-booking-type',
  templateUrl: './edit-booking-type.component.html',
  styleUrls: ['./edit-booking-type.component.css']
})
export class EditBookingTypeComponent implements OnInit {
  
  bookingTypeForm:any;
  bookingTypes:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  bookingTypeID = null;
  mySelect:any;
  

  constructor(private formbuilder: FormBuilder, 
              private service: BookingTypeService, 
              private _snackBar: MatSnackBar , 
              public dialog: MatDialogRef<EditBookingTypeComponent>,
              private location: Location,
              @Inject(MAT_DIALOG_DATA) public data: any,
              ) { }

              ngOnInit(): void {
               this.bookingTypeForm = this.formbuilder.group({
                bookingType_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
                bookingType_Description: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],
               })
               
              }
            
             

                  stopEdit(): void {
                    this.service.updateItem(this.data);
                    this.SavedSuccessful(0);
                  }
            
                  onNoClick(): void {
                    this.dialog.close();
                  }


            
              Cancel(){
                this.location.back();
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
                        duration: 2000,
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                      });
                    }
                  } 

}


