import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeData } from './../../../Interface/Interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add.dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})

export class AddDialogComponent {
  employeeForm:any;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$";
  type: any;
  Dob!: string;
  gender:any="Male";
  idNumber:any;
  maxDate:any = new Date().toISOString().slice(0, 10);
  mySelect:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: EmployeeData,
              public service: EmployeeService, private formbulider: FormBuilder,  private _snackBar: MatSnackBar) { }

ngOnInit(): void {
  this.employeeForm = this.formbulider.group({
    employee_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],
    employee_Surname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],
    employee_Email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
    phone_Number: ['',[Validators.required, Validators.pattern("^[0-9]{10}$")]],
    gender: [this.gender],
    eType:['',[Validators.required]],
    address_Line1:['',[Validators.required, Validators.maxLength(50)]],
    address_Line2:['',[Validators.maxLength(50)]],
    city:['',[Validators.required, Validators.maxLength(50)]],
    doB:['',[Validators.required]],
    id_Number:['',[Validators.required, Validators.pattern("^[0-9]{13}$")]],
    postal_Code:['',[Validators.required, Validators.pattern("^[0-9]{4}$")]]
  })
  this.retrieveEmployeeTypes();
}


retrieveEmployeeTypes(): void {
  this.service.getAllTypes()
    .subscribe(
      data => {
        this.type = data;
    }
    );}

    getDob(idNumber:any) {
      var Year = idNumber.substring(0, 2);
      var Month = idNumber.substring(2, 4);
      var Day = idNumber.substring(4, 6);
      var cutoff = (new Date()).getFullYear() - 2000
      var dob = (Year > cutoff ? '19' : '20') + Year + '-' + Month + '-' + Day;
      this.Dob = dob;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const _employee = this.employeeForm.value;
    _employee.employeeType_Id = this.mySelect;
    this.data.employeeType_ID = this.mySelect;
    this.data.gender = this.gender;
    this.service.addItem(this.data);
    this.SavedSuccessful(1);
  }

  onItemChange(value:any){
    this.gender = value;
 }

 SavedSuccessful(isUpdate:any) {
  if (isUpdate == 0) {
    this._snackBar.open('Record Updated Successfully!', 'Close', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  else if (isUpdate == 1) {
    this._snackBar.open('Record Added Successfully!', 'Close', {
      duration: 3000,
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

