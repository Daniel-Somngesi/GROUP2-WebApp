import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  model: any;

  isNameSelected!: boolean;
  selectInput(event: any) {
    let selected = event.target.value;
    if (selected == "1") {
      this.isNameSelected = true;
    } else {
      this.isNameSelected = false;
    }
  }
  public listUserRoles: any;

  public listSurburbs: any;

  public listProvinces: any;

  public listCountries: any;

  public listCities: any;

  public listFilteredSurburbs: any;

  public listFilteredProvinces: any;


  public listFilteredCities: any;

  SelCountryId: string = '0';
  SelProvinceId: string = '0';
  SelCityId: string = '0';

  formSubmitted = false;
  theErrors: string[] = [];
  timestamp: any;




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
    if (this.authenticationService.currentUser != null) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {

    console.log('register');

    this.data.getAllUserRoles().then((result) => { console.log(result); this.listUserRoles = result });
    // this.data.getAllCities().then((result) => { console.log(result); this.listCities = result });
    // this.data.getAllCountries().then((result) => { console.log(result); this.listCountries = result });
    // this.data.getAllSurburbs().then((result) => { console.log(result); this.listSurburbs = result });
    // this.data.getAllProvinces().then((result) => { console.log(result); this.listProvinces = result });

    //((result) => { console.log(result); this.listUserRoles = result;

    this.registerForm = this.formBuilder.group({
      UserID: [''],
      UserFirstName: ['', Validators.required],
      UserLastName: ['', Validators.required],
      UserEmail: ['', [Validators.required, Validators.email]],
      UserPhoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      UserPassword: ['', [Validators.required, Validators.minLength(6)]],
      UserPasswordConfirm: ['', Validators.required],
      UserDOB: ['', Validators.required],
      UserAddressLine1: ['', Validators.required],
      UserAddressLine2: [''],
      UserPostalCode: ['', [Validators.required, Validators.minLength(4)]],
      userRole_Id: ['', Validators.required],
      SuburbId: ['', Validators.required],
      CityId: ['', Validators.required],
      ProvinceId: ['', Validators.required],
      CountryId: ['', Validators.required],
      timestamp: [''],
      isVerified: [''],


    }, {
      validator: ConfirmedValidator('UserPassword', 'UserPasswordConfirm')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  FillCountry() {

    this.listCountries;
  }
  FillProvince() {

    console.log('Country Id', this.SelCountryId);

    this.listFilteredProvinces = this.listProvinces.filter((item: any) => item.countryID == this.SelCountryId);

    console.log('PROVINCE', this.listFilteredProvinces);

  }
  FillCity() {

    this.listFilteredCities = this.listCities.filter((item: any) => item.provinceID == this.SelProvinceId);
  }
  FillSurburb() {

    this.listFilteredSurburbs = this.listSurburbs.filter((item: any) => item.cityID == this.SelCityId);
  }


  onSubmit(event: any) {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();


    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    this.timestamp = new Date();
    let latest_date_time = this.datepipe.transform(this.timestamp, 'yyyy-MM-ddTHH:mm:ss');

    this.registerForm.get('timestamp')?.setValue(latest_date_time);
    this.registerForm.get('isVerified')?.setValue(0);

    this.loading = true;
    // this.authenticationService.register(this.registerForm.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.alertService.success('Registration successful', true);
    //       this.router.navigate(['auth/login'], { relativeTo: this.route });
    //     },
    //     error => {
    //       this.alertService.error(error);
    //       this.loading = false;
    //     });
  }
}
