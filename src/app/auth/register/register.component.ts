import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

import { DatePipe } from '@angular/common';
import { ConfirmedValidator } from 'src/confirmed.validator';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { HttpEventType } from '@angular/common/http';
import { UserRole } from 'src/app/helpers/types/auth.types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  public User: FormControl = new FormControl();
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  model: any;


  public listUserRoles: UserRole[] = [];

  isNameSelected!: boolean;
  selectInput(event: any) {
    let selected = event.target.value;
    if (selected == "1") {
      this.isNameSelected = true;
    } else {
      this.isNameSelected = false;
    }
  }

  formSubmitted = false;
  theErrors: string[] = [];
  timestamp: any;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    public datepipe: DatePipe,
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _matSnackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.buildForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit(event: any) {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.timestamp = new Date();

    this.loading = true;
    let payload: any = {};
    payload['UserName'] = this.f.UserName.value;
    payload['UserPassword'] = this.f.UserPassword.value;
    payload['PhoneNumber'] = this.f.PhoneNumber.value;

    this._authService.register(payload)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
          }
          if (event.type == HttpEventType.Response) {
            this.loading = false;
            this._openErrorMessageSnackBar("Registration Successful. Contact the admin to create an employee profile for you");
            this._router.navigate(['auth', 'login']);
          }
        },
        error: (error) => {
          this.loading = false;
          this._openErrorMessageSnackBar(error.error.message)
        },
        complete: () => {
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this._matSnackBar.open(message, action, {
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

  private buildForm() {
    this.registerForm = this.formBuilder.group({
      UserName: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required, Validators.pattern("^((\\+27-?))?[0-9]{9}$")]],
      UserPassword: ['', [Validators.required, Validators.minLength(6)]],
      UserPasswordConfirm: ['', Validators.required],
    }, {
      validator: ConfirmedValidator('UserPassword', 'UserPasswordConfirm')
    });
  }
}
