import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';

import { DatePipe } from '@angular/common';
import { ConfirmedValidator } from 'src/confirmed.validator';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { HttpEventType } from '@angular/common/http';
import { UserRole } from 'src/app/helpers/types/auth.types';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _snackBar:MatSnackBar

  ) {
  }

  ngOnInit() {
    this._getUserRoles();

    this.buildForm();
  }

  private _getUserRoles() {
    this._authService.getAllRoles()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as UserRole[];
            this.listUserRoles = res;
            this.buildForm();

          }
        },
        error: (error) => {
        },
        complete: () => {
        }
      });
  }

  private buildForm() {
    this.registerForm = this.formBuilder.group({
      UserName: ['', [Validators.required, Validators.email]],
      UserPassword: ['', [Validators.required, Validators.minLength(6)]],
      UserPasswordConfirm: ['', Validators.required],
      UserRole_Id: ['', Validators.required],
    }, {
      validator: ConfirmedValidator('UserPassword', 'UserPasswordConfirm')
    });
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
    payload['userRole_Id'] = this.f.UserRole_Id.value;

    this._authService.register(payload)
      .subscribe(event => {
        if (event.type === HttpEventType.Sent) {
        }
        if (event.type === HttpEventType.Response) {
          localStorage.setItem('token', event.body['token']);
          const returnUrl = this._activatedRoute.snapshot.queryParams['returnUrl'] || '/';
          this._router.navigateByUrl(returnUrl);
        }
      },
        error => {
          this.loading = false;
          this.openSnackBar(error.error.message,"Error")
        });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
