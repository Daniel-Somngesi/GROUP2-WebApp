import { MedicalAidTypeService } from './../../../services/medical-aid-type.service';
import { MedicalAidTypeListdComponent } from './../medical-aid-type-listd/medical-aid-type-listd.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditUserRoleDialogComponent } from '../../user-role/edit-user-role-dialog/edit-user-role-dialog.component';

@Component({
  selector: 'app-edit-medical-aid-type-dialog',
  templateUrl: './edit-medical-aid-type-dialog.component.html',
  styleUrls: ['./edit-medical-aid-type-dialog.component.css']
})
export class EditMedicalAidTypeDialogComponent implements OnInit {
  medicalAidTypeForm: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public service: MedicalAidTypeService,private _snackBar: MatSnackBar,
    private formbuilder: FormBuilder, public dialog: MatDialogRef<EditMedicalAidTypeDialogComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.medicalAidTypeForm = this.formbuilder.group({
      medicalAidTypeName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],

    })
  }

  stopEdit(): void {
    this.service.updateItem(this.data);
  }

  onNoClick(): void {
    this.dialog.close();
  }

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
