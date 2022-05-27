import { AllergyService } from './../../../services/allergy.service';
import { AllergyData } from './../../../Interface/Interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-allergy-dialog',
  templateUrl: './add-allergy-dialog.component.html',
  styleUrls: ['./add-allergy-dialog.component.css']
})
export class AddAllergyDialogComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  allergyForm: any;
  type: any;

  constructor(public dialogRef: MatDialogRef<AddAllergyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AllergyData,
    public service: AllergyService, private formbulider: FormBuilder,  private _snackBar: MatSnackBar) { }


    ngOnInit(): void {
      this.allergyForm = this.formbulider.group({
        allergy_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],
      })
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    public confirmAdd(): void {
      const _allergy = this.allergyForm.value;
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

