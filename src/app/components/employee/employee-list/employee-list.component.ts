import { EditDialogComponent } from './../edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './../add-dialog/add-dialog.component';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from './../../../services/employee.service';
import { EmployeeData } from './../../../Interface/Interface';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {


  displayedColumns: string[] = ['employee_Name','employee_Surname','id_Number','doB','employee_Email','employeeType_ID','gender','address_Line1','address_Line2','city','postal_code','phone_Number','actions'];
   myDatabase!: EmployeeService;
   dataSource!: myDataSource;
  employee_Id!: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public service:EmployeeService,
    public dialog: MatDialog,
    public http:HttpClient, private _snackBar: MatSnackBar) {
  }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild('filter',  {static: true}) filter!: ElementRef;

  ngOnInit() {
    this.loadData();
    }

    SavedSuccessful(isUpdate:any) {
      if (isUpdate == 0) {
        this._snackBar.open('Record Updated Successfully!', 'Close', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      else if (isUpdate == 1) {
        this._snackBar.open('Record Saved Successfully!', 'Close', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      else if (isUpdate == 2) {
        this._snackBar.open('Record Deleted Successfully!', 'Close', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    }

    reload() {
      this.loadData();
    }

    openAddDialog() {
      const dialogRef = this.dialog.open(AddDialogComponent, {
        data: {EmployeeData: {} }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          // After dialog is closed we're doing frontend updates
          // For add we're just pushing a new row inside DataService
          this.myDatabase.dataChange.value.push(this.service.getDialogData());
          this.reload();
          this.refreshTable();
          this.SavedSuccessful(1);
        }

      });
    }

    startEdit(employee_Id: number, employee_Name: string, employee_Surname: string,
      phone_Number: string, gender: string, employeeType_ID:any, address_Line1: string, address_Line2:string,
      city:string, doB:string, employee_Email:string, id_Number:string, postal_code:string ) {
      this.employee_Id = employee_Id;

      const dialogRef = this.dialog.open(EditDialogComponent, {
        data: {employee_Id:employee_Id, employee_Name:employee_Name, employee_Surname:employee_Surname,
          phone_Number:phone_Number, gender:gender, employeeType_ID:employeeType_ID, address_Line1:address_Line1,
          address_Line2:address_Line2, city:city, doB:doB, employee_Email:employee_Email, id_Number:id_Number,
          postal_code:postal_code}
      });

      dialogRef.afterClosed().subscribe(result => {

        if (result === 1) {
          // When using an edit things are little different, firstly we find record inside DataService by id
          const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.employee_Id === this.employee_Id);
          // Then you update that record using data from dialogData (values you enetered)
          this.myDatabase.dataChange.value[foundIndex] = this.service.getDialogData();
          // And lastly refresh table
          this.reload();
          this.refreshTable();
          this.SavedSuccessful(0);
        }
      });
    }

    deleteItem(employee_Id: number, employee_Name: string, employee_Surname: string,
      phone_Number: string, gender: string, employeeType_ID:any, address_Line1: string, address_Line2:string,
      city:string, doB:Date, employee_Email:string, id_Number:string, postal_code:string) {

      this.employee_Id = employee_Id;
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: {employee_Id: employee_Id, employee_Name: employee_Name, employee_Surname: employee_Surname,
          id_Number: id_Number}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.employee_Id === this.employee_Id);
          // for delete we use splice in order to remove single object from DataService
          this.myDatabase.dataChange.value.splice(foundIndex, 1);
          this.reload();
          this.refreshTable();
          this.SavedSuccessful(2);
        }
      });
    }

    private refreshTable() {
      this.paginator._changePageSize(this.paginator.pageSize);
      window.location.reload();
    }


    public loadData() {
      this.myDatabase = new EmployeeService(this.http);
      this.dataSource = new myDataSource(this.myDatabase, this.paginator, this.sort);
      fromEvent(this.filter.nativeElement, 'keyup')
        // s.debounceTime(150)
        // .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) {
            return;
          }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
    }
  }

  export class myDataSource extends DataSource<EmployeeData> {
    _filterChange = new BehaviorSubject('');

    get filter(): string {
      return this._filterChange.value;
    }

    set filter(filter: string) {
      this._filterChange.next(filter);
    }

    filteredData: EmployeeData[] = [];
    renderedData: EmployeeData[] = [];

    constructor(public _myDatabase: EmployeeService,
                public _paginator: MatPaginator,
                public _sort: MatSort) {
      super();
      // Reset to the first page when the user changes the filter.
      this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<EmployeeData[]> {
      // Listen for any changes in the base data, sorting, filtering, or pagination
      const displayDataChanges = [
        this._myDatabase.dataChange,
        this._sort.sortChange,
        this._filterChange,
        this._paginator.page
      ];

      this._myDatabase.getAllEmployees();


      return merge(...displayDataChanges).pipe(map( () => {
          // Filter data
          this.filteredData = this._myDatabase.data.slice().filter((employee: EmployeeData) => {
            const searchStr = (employee.employee_Id + employee.employee_Name + employee.employee_Surname +
              employee.phone_Number + employee.gender + employee.employeeType_ID + employee.address_Line1 + employee.address_Line2 +
              employee.city + employee.doB + employee.employee_Email + employee.id_Number + employee.postal_code).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });

          // Sort filtered data
          const sortedData = this.sortData(this.filteredData.slice());


          // Grab the page's slice of the filtered sorted data.
          const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
          this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
          return this.renderedData;
        }
      ));
    }


    disconnect() {}

    sortData(data: EmployeeData[]): EmployeeData[] {
      if (!this._sort.active || this._sort.direction === '') {
        return data;
      }

      return data.sort((a, b) => {
        let propertyA: number | string = '' ;
        let propertyB: number | string = '';

        switch (this._sort.active) {
          case 'employee_Id': [propertyA, propertyB] = [a.employee_Id, b.employee_Id]; break;
          case 'employee_Name': [propertyA, propertyB] = [a.employee_Name, b.employee_Name]; break;
          case 'employee_Surname': [propertyA, propertyB] = [a.employee_Surname, b.employee_Surname]; break;
          case 'phone_Number': [propertyA, propertyB] = [a.phone_Number, b.phone_Number]; break;
          case 'gender': [propertyA, propertyB] = [a.gender, b.gender]; break;
          case 'employeeType_ID': [propertyA, propertyB] = [a.employeeType_ID, b.employeeType_ID]; break;
          case 'address_Line1': [propertyA, propertyB] = [a.address_Line1, b.address_Line1]; break;
          case 'address_Line2': [propertyA, propertyB] = [a.address_Line2, b.address_Line2]; break;
          case 'city': [propertyA, propertyB] = [a.city, b.city]; break;
          case 'doB': [propertyA, propertyB] = [a.doB, b.doB]; break;
          case 'employee_Email': [propertyA, propertyB] = [a.employee_Email, b.employee_Email]; break;
          case 'id_Number': [propertyA, propertyB] = [a.id_Number, b.id_Number]; break;
          case 'postal_code': [propertyA, propertyB] = [a.postal_code, b.postal_code]; break;
        }

        const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
        const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

        return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
      });


    }

  }
