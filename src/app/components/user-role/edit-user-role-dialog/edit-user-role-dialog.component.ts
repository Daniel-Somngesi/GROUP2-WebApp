
import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from 'src/app/Interface/company.types';
import { UserRoleData } from 'src/app/Interface/Interface';
import { UserRoleService } from 'src/app/services/user-role.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { UpdateCompanyComponent } from '../../companies/update-company/update-company.component';

@Component({
  selector: 'app-edit-user-role-dialog',
  templateUrl: './edit-user-role-dialog.component.html',
  styleUrls: ['./edit-user-role-dialog.component.css']
})
export class EditUserRoleDialogComponent implements OnInit {
  displayProgressSpinner = false;
  record: UserRoleData;
  form: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditUserRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _userRoleService: UserRoleService
  ) {
    this.record = dataFromParent.record as UserRoleData;
  }

  ngOnInit(): void {
    this._buildForm();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.openSnackBar("Provide all required input", "Error");
    }
    else {
      this._userRoleService.update(this.record.userRole_Id, this.form.value)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Update User Role", "Success");
              this.closeDialog();
            }
          },
          error: (error) => {
            this.displayProgressSpinner = false;
            this._openErrorMessageSnackBar(error.error.message);
          },
          complete: () => {
            this.displayProgressSpinner = false;
          }
        });
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  private _openErrorMessageSnackBar(errorMessage: string) {
    const snackBar = this._matSnackBar.openFromComponent(CustomErrorSnackBarComponent, {
      data: {
        preClose: () => { snackBar.dismiss() },
        parent: errorMessage
      }
    });
  }

  private _buildForm() {
    this.form = this._formBuilder.group({
      Name: [this.record.userRole_Name, [Validators.required]],
    });
  }

  get Name() { return this.form.get('Name'); }
}

