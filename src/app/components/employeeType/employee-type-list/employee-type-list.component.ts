import { DeleteEmployeeTypeDialogComponent } from './../delete-employee-type-dialog/delete-employee-type-dialog.component';
import { EditEmployeeTypeDialogComponent } from './../edit-employee-type-dialog/edit-employee-type-dialog.component';
import { AddEmployeeTypeDialogComponent } from './../add-employee-type-dialog/add-employee-type-dialog.component';
import { EmployeeTypeData } from './../../../Interface/Interface';
import { EmployeeTypeService } from './../../../services/employee-type.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';


@Component({
  selector: 'app-employee-type-list',
  templateUrl: './employee-type-list.component.html',
  styleUrls: ['./employee-type-list.component.css']
})
export class EmployeeTypeListComponent implements OnInit {

  displayedColumns: string[] = ['employeeType_Name', 'employeeType_Description','actions'];

   myDatabase!: EmployeeTypeService;
   dataSource!: myDataSource;
  employeeType_ID!: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialog: MatDialog,
    public http:HttpClient, private service: EmployeeTypeService, private _snackBar: MatSnackBar) { }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild('filter',  {static: true}) filter!: ElementRef;

ngOnInit(): void {
    this.loadData();
  }

  reload() {
    this.loadData();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEmployeeTypeDialogComponent, {
      data: {EmployeeTypeData: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.myDatabase.dataChange.value.push(this.service.getDialogData());
        this.reload();
        this.refreshTable();
      }

    });
  }

  startEdit(employeeType_ID: number, employeeType_Name: string, employeeType_Description: string ) {
    this.employeeType_ID = employeeType_ID;

    const dialogRef = this.dialog.open(EditEmployeeTypeDialogComponent, {
      data: {employeeType_ID: employeeType_ID, employeeType_Name: employeeType_Name, employeeType_Description: employeeType_Description}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.employeeType_ID === this.employeeType_ID);
        // Then you update that record using data from dialogData (values you enetered)
        this.myDatabase.dataChange.value[foundIndex] = this.service.getDialogData();
        // And lastly refresh table
        this.reload();
        this.refreshTable();
      }
    });

}

deleteItem(employeeType_ID: number, employeeType_Name: string, employeeType_Description: string) {

  this.employeeType_ID = employeeType_ID;
  const dialogRef = this.dialog.open(DeleteEmployeeTypeDialogComponent, {
    data: {employeeType_ID: employeeType_ID, employeeType_Name: employeeType_Name, employeeType_Description: employeeType_Description}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.employeeType_ID === this.employeeType_ID);
      // for delete we use splice in order to remove single object from DataService
      this.myDatabase.dataChange.value.splice(foundIndex, 1);
      this.reload();
      this.refreshTable();
    }
  });
}

private refreshTable() {
  this.paginator._changePageSize(this.paginator.pageSize);
  window.location.reload();
}

public loadData() {
  this.myDatabase = new EmployeeTypeService(this.http);
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

export class myDataSource extends DataSource<EmployeeTypeData> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: EmployeeTypeData[] = [];
  renderedData: EmployeeTypeData[] = [];

  constructor(public _myDatabase: EmployeeTypeService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<EmployeeTypeData[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._myDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._myDatabase.getAllEmployeeTypes();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._myDatabase.data.slice().filter((employeeType: EmployeeTypeData) => {
          const searchStr = (employeeType.employeeType_ID + employeeType.employeeType_Name + employeeType.employeeType_Description).toLowerCase();
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

  sortData(data: EmployeeTypeData[]): EmployeeTypeData[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '' ;
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'employeeType_ID': [propertyA, propertyB] = [a.employeeType_ID, b.employeeType_ID]; break;
        case 'employeeType_Name': [propertyA, propertyB] = [a.employeeType_Name, b.employeeType_Name]; break;
        case 'employeeType_Description': [propertyA, propertyB] = [a.employeeType_Description, b.employeeType_Description]; break;

      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
