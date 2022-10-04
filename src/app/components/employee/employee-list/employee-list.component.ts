import { HttpEventType } from '@angular/common/http';
import { EmployeeService } from './../../../services/employee.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { Employee } from 'src/app/Interface/employee.types';
import { ViewEmployeeAddressComponent } from '../view-employee-address/view-employee-address.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  displayProgressSpinner = false;
  dataSource;

  employees: Employee[] = [];
  employee: Employee;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['employeeTypeName', 'employee_Name', 'employee_Surname', 'id_Number', 'gender', 'phone_Number', 'employee_Email', 'actions'];

  constructor(
    private _employeeService: EmployeeService,
    private _matSnackBar: MatSnackBar,
    private _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this._getDataFromServer();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _getDataFromServer() {
    this._employeeService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Employee[];
            this.employees = res;
            this.dataSource = new MatTableDataSource<Employee>(this.employees);
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

  onViewAdress(employee: Employee) {
    let dialogRef = this._matDialog.open(ViewEmployeeAddressComponent, {
      width: "80%",
      height: "auto",
      data: {
        record: employee
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    });
  }

  onUpdate(employee: Employee) {
    let dialogRef = this._matDialog.open(EditDialogComponent, {
      width: "80%",
      height: "auto",
      data: {
        record: employee
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    });
  }

  onDelete(employee: Employee) {
    let dialogRef = this._matDialog.open(DeleteDialogComponent, {
      width: "80%",
      height: "auto",
      data: {
        record: employee
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
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
}
