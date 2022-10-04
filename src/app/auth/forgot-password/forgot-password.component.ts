import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { CustomInputValidators } from 'src/app/services/validators/authentication.validator';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  otpRequestError = false;
  OnValidateOtpError = false;
  onSubmitError = false;
  returnUrl!: string;
  showOtpControl = false;
  showResetPasswordControls = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      OTP: [''],
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', Validators.required]
    }, {
      validators: [
        CustomInputValidators.PasswordOptions,
        CustomInputValidators.PasswordMatch
      ]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onRequestOtp() {
    this.otpRequestError = true;
    let isValid = true;

    let payload: any = {};
    payload['Username'] = this.f.username.value;

    if (this.f.username.value == '') {
      isValid = false;
      return;
    }

    if (isValid) {
      this._authService.resetPasswordRequestOTP(payload)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this.loading = true;
          }
          if (event.type === HttpEventType.Response) {
            this.showOtpControl = true;
            this.loading = false;
            this.openSnackBar("OTP sent to your cell number", "Info");

          }
        },
          error => {
            this.loading = false;
            this._openErrorMessageSnackBar(error.error.message);
          });
    }
  }

  OnValidateOtp() {
    this.OnValidateOtpError = true;
    let isValid = true;

    if (this.f.username.value == '') {
      isValid = false;
      return;
    }

    if (this.f.OTP.value == '') {
      isValid = false;
      return;
    }

    if (isValid) {
      let payload: any = {};
      payload['Username'] = this.f.username.value;
      payload['OTP'] = this.f.OTP.value;

      this._authService.resetPasswordValidateOTP(payload)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this.loading = true;
          }
          if (event.type === HttpEventType.Response) {
            this.loading = false;
            this.showResetPasswordControls = true;

          }
        },
          error => {
            this.loading = false;
            this._openErrorMessageSnackBar(error.error.message);
          });
    }
  }

  onSubmit() {
    this.onSubmitError = true;
    let isValid = true;

    if (this.f.username.errors) {
      isValid = false;
      return;
    }

    if (this.f.Password.errors) {
      isValid = false;
      return;
    }

    if (this.f.ConfirmPassword.errors) {
      isValid = false;
      return;
    }


    if (isValid) {
      let payload: any = {};
      payload['Username'] = this.f.username.value;
      payload['Password'] = this.f.Password.value;

      this._authService.resetPasswordSetupPassword(payload)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this.loading = true;
          }
          if (event.type === HttpEventType.Response) {
            this.loading = false;
            this.openSnackBar("Password Reset", "Success");
            this.router.navigate(['auth', 'login']);


          }
        },
          error => {
            this.loading = false;
            this._openErrorMessageSnackBar(error.error.message);
          });
    }
  }

  onNavigateToRegister() {
    this.router.navigate(['auth', 'register']);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  private _openErrorMessageSnackBar(errorMessage: string) {
    const snackBar = this._snackBar.openFromComponent(CustomErrorSnackBarComponent, {
      data: {
        preClose: () => { snackBar.dismiss() },
        parent: errorMessage
      }
    });
  }

}
