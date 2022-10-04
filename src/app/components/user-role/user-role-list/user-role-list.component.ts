import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { CurrentUser } from 'src/app/helpers/types/auth.types';
import { Class } from 'src/app/Interface/class.types';
import { Company } from 'src/app/Interface/company.types';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { DeleteCompanyComponent } from '../../companies/delete-company/delete-company.component';
import { UpdateCompanyComponent } from '../../companies/update-company/update-company.component';
import { AddRequiredConsumablesComponent } from '../../required-consumables/add-required-consumables/add-required-consumables.component';
import { UserRoleData } from 'src/app/Interface/Interface';
import { UserRoleService } from 'src/app/services/user-role.service';
import { AddUserRoleDialogComponent } from '../add-user-role-dialog/add-user-role-dialog.component';
import { EditUserRoleDialogComponent } from '../edit-user-role-dialog/edit-user-role-dialog.component';
import { DeleteUserRoleDeleteComponent } from '../delete-user-role-delete/delete-user-role-delete.component';

@Component({
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.css']
})

export class UserRoleListComponent implements OnInit {
  displayProgressSpinner = false;
  dataSource;

  displayedColumns: string[] = ['userRole_Name', 'usersCount', 'actions'];

  roles: UserRoleData[] = [];
  role: UserRoleData;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _matDialog: MatDialog,
    private _userRolesService: UserRoleService,
    private _authService: AuthService,

  ) {
    this._setUser();
  }

  ngOnInit(): void {
    this._getDataFromServer();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAdd() {
    let dialogRef = this._matDialog.open(AddUserRoleDialogComponent, {
      width: "900px",
      height: "auto"
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    })
  }

  onUpdateValue(value: UserRoleData) {
    let dialogRef = this._matDialog.open(EditUserRoleDialogComponent, {
      width: "80%",
      height: "auto",
      data: {
        record: value
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    });
  }

  onDeleteValue(value: UserRoleData) {
    let dialogRef = this._matDialog.open(DeleteUserRoleDeleteComponent, {
      data: {
        record: value
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    });
  }


  onAddRequiredConsumables(element: Class) {
    console.log(element)
    let dialogRef = this._matDialog.open(AddRequiredConsumablesComponent, {
      width: "80%",
      height: "auto",
      data: {
        record: element
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    });
  }
  private _getDataFromServer() {
    this._userRolesService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as UserRoleData[];
            this.roles = res;
            this.dataSource = new MatTableDataSource<UserRoleData>(this.roles);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.displayProgressSpinner = false;
          }
        },
        error: (error) => {
          this.displayProgressSpinner = false;
          this._openErrorMessageSnackBar(error.error.message);
        },
        complete: () => {
          this.displayProgressSpinner = false;
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this._matSnackBar.open(message, action, {
      duration: 2000,
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

  user: CurrentUser;
  private _setUser() {
    if (this._authService.currentUser != null) {
      this.user = this._authService.currentUser;
    }
  }

  get isAdmin() {
    if (this._authService.currentUser != null) {
      if (this.user.EmployeeType == 'Admin' || this.user.UserRole == 'administrator') {
        return true;
      }
      else {
        return false;
      }
    }
    return false;
  }

}


