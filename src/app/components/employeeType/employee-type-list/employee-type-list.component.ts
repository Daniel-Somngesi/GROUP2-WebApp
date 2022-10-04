import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CurrentUser } from 'src/app/helpers/types/auth.types';
import {  EmployeeType } from 'src/app/Interface/employee.types';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { EmployeeTypeService } from 'src/app/services/employee-types/employee-type.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { AddEmployeeTypeDialogComponent } from '../add-employee-type-dialog/add-employee-type-dialog.component';
import { DeleteEmployeeTypeDialogComponent } from '../delete-employee-type-dialog/delete-employee-type-dialog.component';
import { EditEmployeeTypeDialogComponent } from '../edit-employee-type-dialog/edit-employee-type-dialog.component';


@Component({
  selector: 'app-employee-type-list',
  templateUrl: './employee-type-list.component.html',
  styleUrls: ['./employee-type-list.component.css']
})
export class EmployeeTypeListComponent implements OnInit {
  displayProgressSpinner = false;
  dataSource;

  displayedColumns: string[] = ['name', 'description', 'employeesCount', 'actions'];

  types: EmployeeType[] = [];
  type: EmployeeType;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _matDialog: MatDialog,
    private _employeeTypesService: EmployeeTypeService,
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
    let dialogRef = this._matDialog.open(AddEmployeeTypeDialogComponent, {
      width: "900px",
      height: "auto"
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    })
  }

  onUpdateValue(value: EmployeeType) {
    let dialogRef = this._matDialog.open(EditEmployeeTypeDialogComponent, {
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

  onDeleteValue(value: EmployeeType) {
    let dialogRef = this._matDialog.open(DeleteEmployeeTypeDialogComponent, {
      data: {
        record: value
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    });
  }

  private _getDataFromServer() {
    this._employeeTypesService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as EmployeeType[];
            this.types = res;
            this.dataSource = new MatTableDataSource<EmployeeType>(this.types);
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


