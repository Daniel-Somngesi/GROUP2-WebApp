
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FeeService } from 'src/app/services/fee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-fee-dialog',
  templateUrl: './edit-fee-dialog.component.html',
  styleUrls: ['./edit-fee-dialog.component.css']
})
export class EditFeeDialogComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  feeForm: any;
  type: any;
  feeName: any;
  mySelect!:number;
  typeName:any;
  value: any;

  constructor(public service: FeeService,private _snackBar: MatSnackBar,
    private formbulider: FormBuilder, public dialog: MatDialogRef<EditFeeDialogComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.feeForm = this.formbulider.group({
      fee_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
      fee_Amount: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(100),]],
      feeTypeName:[''],
      fType:['', Validators.required],
    })
    this.retrieveFeeTypes()

  }

  stopEdit(): void {

    this.data.feeType_Name = this.mySelect;
      this.service.updateItem(this.data);
    this.SavedSuccessful(0);
  }


  /*getFeeTypeName(){
    this.service.getFeeTypeById(this.data.feeType_Id).subscribe(feeType => {
      this.feeName = feeType.feeType_Name;
      console.log(this.feeName);

    });
  } */

  onNoClick(): void {
    this.dialog.close();
  }

  retrieveFeeTypes(): void {
    this.service.getAllFeeTypes()
      .subscribe(
        data => {
          this.type = data;
      }
      );}

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
