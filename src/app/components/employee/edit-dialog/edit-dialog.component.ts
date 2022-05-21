import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  employeeForm: any;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$";
  gender:any;
  type: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  Dob!: string;
  maxDate:any = new Date().toISOString().slice(0, 10);
  mySelect:any;

  constructor(public service: EmployeeService,private _snackBar: MatSnackBar,  private formbulider: FormBuilder, public dialog: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.employeeForm = this.formbulider.group({
      employee_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],
      employee_Surname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(100)]],
      employee_Email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      phone_Number: ['',[Validators.required, Validators.pattern("^[0-9]{10}$")]],
      gender: [this.data.gender],
      eType:['',[Validators.required]],
      address_Line1:['',[Validators.required, Validators.maxLength(50)]],
      address_Line2:['',[Validators.maxLength(50)]],
      city:['',[Validators.required, Validators.maxLength(50)]],
      doB:[this.Dob,[Validators.required]],
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

      stopEdit(): void {
        this.service.updateItem(this.data);
        this.SavedSuccessful(0);
      }

      onItemChange(value:any){
        this.gender = value;
     }

     onNoClick(): void {
      this.dialog.close();
    }

     getDob(idNumber:any) {
      var Year = idNumber.substring(0, 2);
      var Month = idNumber.substring(2, 4);
      var Day = idNumber.substring(4, 6);
      var cutoff = (new Date()).getFullYear() - 2000
      var dob = (Year > cutoff ? '19' : '20') + Year + '-' + Month + '-' + Day;
      this.Dob = dob;
    }

    SavedSuccessful(isUpdate:any) {
      if (isUpdate == 0) {
        this._snackBar.open('Record Updated Successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      else if (isUpdate == 1) {
        this._snackBar.open('Record Saved Successfully!', 'Close', {
          duration: 2000,
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
