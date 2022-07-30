import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { UserRoleService } from 'src/app/services/user-role.service';

import { DatePipe } from '@angular/common';
import { ConfirmedValidator } from 'src/confirmed.validator';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    public User: FormControl = new FormControl();
    registerForm!: FormGroup;
    loading = false;
    submitted = false;
    model:any;

    isNameSelected!: boolean;
    selectInput(event:any) {
        let selected = event.target.value;
        if (selected == "1") {
            this.isNameSelected = true;
        } else {
            this.isNameSelected = false;
        }
    }
    public listUserRoles: any;
    formSubmitted = false;
    theErrors: string[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private userRoleService: UserRoleService,
        private alertService: AlertService,
        private data: DataService,
        public datepipe: DatePipe,

    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {

        console.log('register');

        this.data.getAllUserRoles().then((result) => { console.log(result); this.listUserRoles = result });

        //((result) => { console.log(result); this.listUserRoles = result;

        this.registerForm = this.formBuilder.group({
            User_ID: [''],
            UserName: ['', [Validators.required, Validators.email]],
            Password: ['', [Validators.required, Validators.minLength(6)]],
            UserPasswordConfirm: ['', Validators.required],
            userRole_Id: ['', Validators.required],

        }, {
            validator: ConfirmedValidator('Password', 'UserPasswordConfirm')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }


    onSubmit(event:any) {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        console.log(this.registerForm.value);


        this.loading = true;
        this.authenticationService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['auth/login'], { relativeTo: this.route });
                    alert("submitted")
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
