import { MedicalAidTypeService } from './../../../services/medical-aid-type.service';
import { MedicalAidTypeData } from './../../../Interface/Interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-medical-aid-type-dialog',
  templateUrl: './add-medical-aid-type-dialog.component.html',
  styleUrls: ['./add-medical-aid-type-dialog.component.css']
})
export class AddMedicalAidTypeDialogComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    userRoleForm: any;
    type: any;
  medicalAidTypeForm: any;

  constructor(public dialogRef: MatDialogRef<AddMedicalAidTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MedicalAidTypeData,
    public service: MedicalAidTypeService, private formbulider: FormBuilder,  private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
      this.medicalAidTypeForm = this.formbulider.group({
        medicalAidTypeName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],
      })
    }

        onNoClick(): void {
          this.dialogRef.close();
        }

        public confirmAdd(): void {
          const _medicalaidtype = this.medicalAidTypeForm.value;
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
