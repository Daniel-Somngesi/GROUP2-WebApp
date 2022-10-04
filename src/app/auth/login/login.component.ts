import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';

@Component(
  {
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
  })
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  showOtpControl = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _mixPanel: MixpanelService
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      OTP: ['']
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onRequestOtp() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    let payload: any = {};
    payload['Username'] = this.f.username.value;
    payload['Password'] = this.f.password.value;
    this._authService.requestOTP(payload)
      .subscribe(event => {
        if (event.type === HttpEventType.Sent) {
          this.loading = true;
        }
        if (event.type === HttpEventType.Response) {
          this.showOtpControl = true;
          this.loading = false;
          this.openSnackBar("OTP sent to your cell number", "Info");
          this._mixPanel.track("Request 2FA OTP")
        }
      },
        error => {
          this.loading = false;
          this._openErrorMessageSnackBar(error.error.message);
        });
  }

  onSubmit() {
    this.submitted = true;
    let isValid = true;

    if (this.f.username.value == '') {
      this.openSnackBar("Username is required", "Error");
      isValid = false;
    }

    if (this.f.OTP.value == '') {
      this.openSnackBar("OTP is required", "Error");
      isValid = false;
    }

    if (isValid) {
      let payload: any = {};
      payload['Username'] = this.f.username.value;
      payload['OTP'] = this.f.OTP.value;

      this._authService.validateOTP(payload)
        .subscribe(event => {
          if (event.type === HttpEventType.Sent) {
            this.loading = true;
          }
          if (event.type === HttpEventType.Response) {
            this.loading = false;
            localStorage.setItem('token', event.body['token']);
            this._mixPanel.track("Log In")
            if (this._authService.isSignedIn()) {
              if (this._authService.currentUser.UserRole.toLowerCase() == "Parent".toLowerCase()) {
                this.openSnackBar("Cannot log in to admin dashboard with parent account", "Error");
              }
              if (
                this._authService.currentUser.UserRole.toLowerCase() == "Employee".toLowerCase() ||
                this._authService.currentUser.UserRole.toLowerCase() == "administrator".toLowerCase()
              ) {
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
              }
            }
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

  onNavigateToForgotPassword() {
    this.router.navigate(['auth', 'forgot-password']);
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
