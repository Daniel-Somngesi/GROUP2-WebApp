import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { CustomInputValidators } from 'src/app/services/validators/authentication.validator';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-reset-account-password',
  templateUrl: './reset-account-password.component.html',
  styleUrls: ['./reset-account-password.component.css']
})
export class ResetAccountPasswordComponent implements OnInit {

  resetForm: FormGroup;
  displayProgressSpinner = false;


  errorMessage = "";
  showLoadingEndicator = false;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
  ) {
    this._buildForm();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.resetForm.valid) {

      let payload: any = {};
      payload['CurrentPassword'] = this.CurrentPassword.value;
      payload['Password'] = this.Password.value;
      this._authService.resetPassword(payload)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Reset Password", "Success");
              window.location.reload();
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
    else {
      this.openSnackBar("Provide Required Fileds", "Error");
    }
  }


  private _buildForm() {
    this.resetForm = this._formBuilder.group({
      CurrentPassword: ['', Validators.required],
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', Validators.required],
    }, {
      validators: [
        CustomInputValidators.PasswordOptions,
        CustomInputValidators.PasswordMatch
      ]
    });
  }

  get CurrentPassword() { return this.resetForm.get('CurrentPassword'); }
  get Password() { return this.resetForm.get('Password'); }
  get ConfirmPassword() { return this.resetForm.get('ConfirmPassword'); }


  private _openErrorMessageSnackBar(errorMessage: string) {
    const snackBar = this._matSnackBar.openFromComponent(CustomErrorSnackBarComponent, {
      data: {
        preClose: () => { snackBar.dismiss() },
        parent: errorMessage
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._matSnackBar.open(message, action, {
      duration: 3000,
    });
  }
}

