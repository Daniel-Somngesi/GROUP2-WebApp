import { UserRoleData } from './../../../Interface/Interface';
import { UserRoleService } from './../../../services/user-role.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.css']
})

export class UserRoleListComponent implements OnInit {

  userRoleForm:any;
  userroles:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  currentUserRole:any = null;
  userRoleIdUpdate = null;
  userRoleId = null;
  userRole_Name : string = "";

  constructor(private route: ActivatedRoute, private formbulider: FormBuilder, private service: UserRoleService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.retrieveUserRoles();
    this.userRoleForm = this.formbulider.group({
      userRole_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(20)]]
    });
  }

  retrieveUserRoles(): void {
    this.service.getAll()
      .subscribe(
        data => {
          this.userroles = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
      }

      onFormSubmit() {
        const _userrole = this.userRoleForm.value;
        this.CreateUserRole(_userrole);
      }

      loadUserRoleToEdit(_userroleId:any) {
        this.service.get(_userroleId).subscribe(userrole => {
          this.userRoleIdUpdate = userrole.userRole_Id;
          this.userRoleForm.controls['userRole_Name'].setValue(userrole.userRole_Name);

        });
    }

      deleteUserRole(employeeId: string) {
        if (confirm("Are you sure you want to delete this user role?")) {
          this.service.delete(employeeId).subscribe(() => {
            this.SavedSuccessful(2);
            this.retrieveUserRoles();
            this.userRoleForm.reset();

          });
        }
      }

      CreateUserRole(userrole: UserRoleData) {
        if (this.userRoleIdUpdate == null) {

          this.service.create(userrole).subscribe(
            () => {
              this.SavedSuccessful(1);
              this.retrieveUserRoles();
              this.userRoleIdUpdate = null;
              this.userRoleForm.reset();
            }
          );
        } else {
          userrole.userRole_Id = this.userRoleIdUpdate;
          userrole.userRole_Name = this.userRole_Name;
          this.service.update(userrole.userRole_Id, userrole).subscribe(() => {
            this.SavedSuccessful(0);
            this.retrieveUserRoles();
            this.userRoleIdUpdate = null;
            this.userRoleForm.reset();
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
