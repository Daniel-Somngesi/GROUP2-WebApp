import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CurrentUser } from 'src/app/helpers/types/auth.types';
import { Class } from 'src/app/Interface/class.types';
import { Enrollment } from 'src/app/Interface/enrollment.types';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { EnrollmentService } from 'src/app/services/enrollment/enrollment.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { AddClassComponent } from '../../classes/add-class/add-class.component';
import { ReceiveConsumablesComponent } from '../receive-consumables/receive-consumables.component';

@Component({
  selector: 'app-list-enrollments',
  templateUrl: './list-enrollments.component.html',
  styleUrls: ['./list-enrollments.component.css']
})
export class ListEnrollmentsComponent implements OnInit {
  displayProgressSpinner = false;
  dataSource;

  displayedColumns: string[] = ['academicYear', 'className', 'teacherFullName', 'childFullName', 'actions'];

  enrollments: Enrollment[] = [];
  enrollment: Class;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _matDialog: MatDialog,
    private _enrollmentService: EnrollmentService,
    private _authService: AuthService
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
    let dialogRef = this._matDialog.open(AddClassComponent, {
      width: "900px",
      height: "auto"
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    })
  }

  onDeleteValue(value: Enrollment) {
    this._enrollmentService.delete(value.childId)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            this.displayProgressSpinner = false;
            this._getDataFromServer();
            this.openSnackBar("Remove child from class", "Success");
          }
        },
        error: (error) => {
          this.displayProgressSpinner = false;
          this._openErrorMessageSnackBar(error.error.message);
        },
        complete: () => {
          this.displayProgressSpinner = false;
        }
      })
  }

  onReciveConsumables(element: Enrollment) {
    let dialogRef = this._matDialog.open(ReceiveConsumablesComponent, {
      width: "80%",
      height: "100%",
      data: {
        record: element
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    });
  }

  private _getDataFromServer() {
    this._enrollmentService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Enrollment[];
            this.enrollments = res;
            this.dataSource = new MatTableDataSource<Enrollment>(this.enrollments);
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
      duration: 3000,
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




