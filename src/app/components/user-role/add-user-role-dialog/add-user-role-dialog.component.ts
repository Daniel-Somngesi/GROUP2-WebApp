import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEventType } from '@angular/common/http';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { AddClassComponent } from '../../classes/add-class/add-class.component';
import { UserRoleService } from 'src/app/services/user-role.service';

@Component({
  selector: 'app-add-user-role-dialog',
  templateUrl: './add-user-role-dialog.component.html',
  styleUrls: ['./add-user-role-dialog.component.css']
})

export class AddUserRoleDialogComponent implements OnInit {
  displayProgressSpinner = false;

  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddClassComponent>,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _userRoleService: UserRoleService,
  ) { }

  ngOnInit(): void {
    this._buildForm();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.openSnackBar("Provide all required input", "Error");
    }
    else {
      this._userRoleService.create(this.form.value)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Add User Role", "Success");
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
      Name: ['', [Validators.required]],
    });
  }

  get Name() { return this.form.get('Name'); }
}
