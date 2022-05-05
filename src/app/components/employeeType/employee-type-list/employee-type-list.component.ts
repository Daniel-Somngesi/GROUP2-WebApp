import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EmployeeTypeData } from 'src/app/Interface/Interface';
import { EmployeeTypeService } from './../../../services/employee-type.service';

@Component({
  selector: 'app-employee-type-list',
  templateUrl: './employee-type-list.component.html',
  styleUrls: ['./employee-type-list.component.css']
})
export class EmployeeTypeListComponent implements OnInit {
  employeeTypeForm:any;
  employeeTypes:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  currentEmployeeTypes:any = null;
  employeeTypeIdUpdate = null;
  employeeTypeID = null;
  employeeType_Name : string = "";
  employeeType_Description : string = "";

  constructor(private route: ActivatedRoute, private formbulider: FormBuilder, private service: EmployeeTypeService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.retrieveEmployeeType();
    this.employeeTypeForm = this.formbulider.group({
      employeeType_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]],
      employeeType_Description: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)]]

    });
  }

  retrieveEmployeeType(): void {
    this.service.getAll()
      .subscribe(
        data => {
          this.employeeTypes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
      }

      onFormSubmit() {
        const _employeeType = this.employeeTypeForm.value;
        this.CreateEmployeeType(_employeeType);
      }

      loadEmployeeTypeToEdit(employeeType_ID:any) {
        this.service.get(employeeType_ID).subscribe(employeeType => {
          this.employeeTypeIdUpdate = employeeType.employeeType_ID;
          this.employeeTypeForm.controls['employeeType_Name'].setValue(employeeType.employeeType_Name);
          this.employeeTypeForm.controls['employeeType_Description'].setValue(employeeType.employeeType_Description);
        });
    }

      deleteEmployeeType(id: any) {
        if (confirm("Are you sure you want to delete this employee type?")) {
          this.service.delete(id).subscribe(() => {
            console.log(id);
            this.SavedSuccessful(2);
            this.retrieveEmployeeType();
            this.employeeTypeForm.reset();


          });
        }
      }

      CreateEmployeeType(employeeType: EmployeeTypeData) {
        if (this.employeeTypeIdUpdate == null) {

          this.service.create(employeeType).subscribe(
            () => {
              this.SavedSuccessful(1);
              this.retrieveEmployeeType();
              this.employeeTypeIdUpdate = null;
              this.employeeTypeForm.reset();
            }
          );
        } else {
          employeeType.employeeType_ID = this.employeeTypeIdUpdate;
          employeeType.employeeType_Name = this.employeeType_Name;
          employeeType.employeeType_Description = this.employeeType_Description;
          this.service.update(employeeType.employeeType_ID, employeeType).subscribe(() => {
            this.SavedSuccessful(0);
            this.retrieveEmployeeType();
            this.employeeTypeIdUpdate = null;
            this.employeeTypeForm.reset();
          });
        }
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


