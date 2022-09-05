import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CurrentUser } from 'src/app/helpers/types/auth.types';
import { Class } from 'src/app/Interface/class.types';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { ClassService } from 'src/app/services/class/class.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { DeleteBusinessRuleComponent } from '../../business-rules/delete-business-rule/delete-business-rule.component';
import { UpdateBusinessRuleComponent } from '../../business-rules/update-business-rule/update-business-rule.component';
import { AddRequiredConsumablesComponent } from '../../required-consumables/add-required-consumables/add-required-consumables.component';
import { AddClassComponent } from '../add-class/add-class.component';
import { DeleteClassComponent } from '../delete-class/delete-class.component';
import { UpdateClassComponent } from '../update-class/update-class.component';

@Component({
  selector: 'app-list-classes',
  templateUrl: './list-classes.component.html',
  styleUrls: ['./list-classes.component.css']
})
export class ListClassesComponent implements OnInit {
  displayProgressSpinner = false;
  dataSource;

  displayedColumns: string[] = ['name', 'teacherFullName', 'enrollmentCount', 'actions'];

  classes: Class[] = [];
  clsss: Class;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _matDialog: MatDialog,
    private _classService: ClassService,
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

  onUpdateValue(value: Class) {
    let dialogRef = this._matDialog.open(UpdateClassComponent, {
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

  onDeleteValue(value: Class) {
    let dialogRef = this._matDialog.open(DeleteClassComponent, {
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
    this._classService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Class[];
            this.classes = res;
            this.dataSource = new MatTableDataSource<Class>(this.classes);
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


