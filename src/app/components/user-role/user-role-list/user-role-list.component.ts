
import { DeleteUserRoleDeleteComponent } from './../delete-user-role-delete/delete-user-role-delete.component';
import { EditUserRoleDialogComponent } from './../edit-user-role-dialog/edit-user-role-dialog.component';
import { AddUserRoleDialogComponent } from './../add-user-role-dialog/add-user-role-dialog.component';
import { UserRoleData } from './../../../Interface/Interface';
import { UserRoleService } from './../../../services/user-role.service';
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
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.css']
})

export class UserRoleListComponent implements OnInit {

  displayedColumns: string[] = ['userRole_Name','actions'];
   myDatabase!: UserRoleService;
   dataSource!: myDataSource;
  userRole_Id!: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialog: MatDialog,
    public http:HttpClient, private service: UserRoleService, private _snackBar: MatSnackBar) { }

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
    const dialogRef = this.dialog.open(AddUserRoleDialogComponent, {
      data: {EmployeeData: {} }
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

  startEdit(userRole_Id: number, userRole_Name: string ) {
    this.userRole_Id = userRole_Id;

    const dialogRef = this.dialog.open(EditUserRoleDialogComponent, {
      data: {userRole_Id: userRole_Id, userRole_Name: userRole_Name}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.userRole_Id === this.userRole_Id);
        // Then you update that record using data from dialogData (values you enetered)
        this.myDatabase.dataChange.value[foundIndex] = this.service.getDialogData();
        // And lastly refresh table
        this.reload();
        this.refreshTable();
      }
    });
  }

  deleteItem(userRole_Id: number, userRole_Name: string) {

    this.userRole_Id = userRole_Id;
    const dialogRef = this.dialog.open(DeleteUserRoleDeleteComponent, {
      data: {userRole_Id: userRole_Id, userRole_Name: userRole_Name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.userRole_Id === this.userRole_Id);
        // for delete we use splice in order to remove single object from DataService
        this.myDatabase.dataChange.value.splice(foundIndex, 1);
        this.reload();
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  public loadData() {
    this.myDatabase = new UserRoleService(this.http);
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

export class myDataSource extends DataSource<UserRoleData> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: UserRoleData[] = [];
  renderedData: UserRoleData[] = [];

  constructor(public _myDatabase: UserRoleService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserRoleData[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._myDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._myDatabase.getAllUserRoles();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._myDatabase.data.slice().filter((userRole: UserRoleData) => {
          const searchStr = (userRole.userRole_Id + userRole.userRole_Name);
          return searchStr.toString().indexOf(this.filter.toLowerCase()) !== -1;
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

  sortData(data: UserRoleData[]): UserRoleData[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '' ;
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'employee_Id': [propertyA, propertyB] = [a.userRole_Id, b.userRole_Id]; break;
        case 'employee_Name': [propertyA, propertyB] = [a.userRole_Name, b.userRole_Name]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
