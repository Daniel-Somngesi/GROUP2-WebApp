import { FeeData } from './../../../Interface/Interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FeeService } from 'src/app/services/fee.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-fee-dialog',
  templateUrl: './add-fee-dialog.component.html',
  styleUrls: ['./add-fee-dialog.component.css']
})
export class AddFeeDialogComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  fee: any;
  feeForm: any;
  type: any;
  feeName: any;
  mySelect!:number;
  typeName: any;

  constructor(public dialogRef: MatDialogRef<AddFeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FeeData,
    public service: FeeService, private formbulider: FormBuilder,  private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
      this.feeForm = this.formbulider.group({
        fee_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
        fee_Amount: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(100),]],
        feeTypeName:[''],
        fType:['',[Validators.required]],
      })
      this.retrieveEmployeeTypes();
    }

    retrieveEmployeeTypes(): void {
      this.service.getAllFeeTypes()
        .subscribe(
          data => {
            this.type = data;
        }
        );}

        getFeeTypeName(){
          this.service.getFeeTypeById(this.mySelect).subscribe(feeType => {
            this.feeName = feeType.feeType_Name;
            console.log(this.feeName);
          });
        }

    onNoClick(): void {
      this.dialogRef.close();
    }

    public confirmAdd(): void {
      const _fee = this.feeForm.value;

      _fee.feeType_Id = this.mySelect;
      this.data.feeType_Id = this.mySelect;
      this.data.feeType_Name = this.feeName;
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
