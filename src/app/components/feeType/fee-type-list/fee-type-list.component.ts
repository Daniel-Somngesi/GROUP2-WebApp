import { DeleteFeeTypeDialogComponent } from './../delete-fee-type-dialog/delete-fee-type-dialog.component';
import { EditFeeTypeDialogComponent } from './../edit-fee-type-dialog/edit-fee-type-dialog.component';
import { AddFeeTypeDialogComponent } from './../add-fee-type-dialog/add-fee-type-dialog.component';
import { FeeTypeData } from './../../../Interface/Interface';
import { FeeTypeService } from './../../../services/fee-type.service';
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
  selector: 'app-fee-type-list',
  templateUrl: './fee-type-list.component.html',
  styleUrls: ['./fee-type-list.component.css']
})
export class FeeTypeListComponent implements OnInit {

  displayedColumns: string[] = ['feeType_Name', 'feeType_Description','actions'];

   myDatabase!: FeeTypeService;
   dataSource!: myDataSource;
  feeType_Id!: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialog: MatDialog,
    public http:HttpClient, private service: FeeTypeService, private _snackBar: MatSnackBar) { }

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
    const dialogRef = this.dialog.open(AddFeeTypeDialogComponent, {
      data: {FeeTypeData: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.myDatabase.dataChange.value.push(this.service.getDialogData());
        this.refreshTable();
        this.reload();
      }

    });
  }

  startEdit(feeType_Id: number, feeType_Name: string, feeType_Description: string ) {
    this.feeType_Id = feeType_Id;

    const dialogRef = this.dialog.open(EditFeeTypeDialogComponent, {
      data: {feeType_Id: feeType_Id, feeType_Name: feeType_Name, feeType_Description: feeType_Description}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.feeType_Id === this.feeType_Id);
        // Then you update that record using data from dialogData (values you enetered)
        this.myDatabase.dataChange.value[foundIndex] = this.service.getDialogData();
        // And lastly refresh table
        this.refreshTable();
        this.reload();
      }
    });

}

deleteItem(feeType_Id: number, feeType_Name: string, feeType_Description: string) {

  this.feeType_Id = feeType_Id;
  const dialogRef = this.dialog.open(DeleteFeeTypeDialogComponent, {
    data: {feeType_Id: feeType_Id, feeType_Name: feeType_Name, feeType_Description: feeType_Description}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.feeType_Id === this.feeType_Id);
      // for delete we use splice in order to remove single object from DataService
      this.myDatabase.dataChange.value.splice(foundIndex, 1);
      this.refreshTable();
      this.reload();
    }
  });
}

private refreshTable() {
  this.paginator._changePageSize(this.paginator.pageSize);
  window.location.reload();
}

public loadData() {
  this.myDatabase = new FeeTypeService(this.http);
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

export class myDataSource extends DataSource<FeeTypeData> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: FeeTypeData[] = [];
  renderedData: FeeTypeData[] = [];

  constructor(public _myDatabase: FeeTypeService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<FeeTypeData[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._myDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._myDatabase.getAllFeeTypes();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._myDatabase.data.slice().filter((feetype: FeeTypeData) => {
          const searchStr = (feetype.feeType_Id + feetype.feeType_Name + feetype.feeType_Description).toLowerCase();
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

  sortData(data: FeeTypeData[]): FeeTypeData[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '' ;
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'feeType_Id': [propertyA, propertyB] = [a.feeType_Id, b.feeType_Id]; break;
        case 'feeType_Name': [propertyA, propertyB] = [a.feeType_Name, b.feeType_Name]; break;
        case 'feeType_Description': [propertyA, propertyB] = [a.feeType_Description, b.feeType_Description]; break;

      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
