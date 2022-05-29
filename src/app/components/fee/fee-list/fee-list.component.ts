import { DeleteFeeDialogComponent } from './../delete-fee-dialog/delete-fee-dialog.component';
import { EditFeeDialogComponent } from './../edit-fee-dialog/edit-fee-dialog.component';
import { AddFeeDialogComponent } from './../add-fee-dialog/add-fee-dialog.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { FeeService } from 'src/app/services/fee.service';
import { FeeData } from 'src/app/Interface/Interface';


@Component({
  selector: 'app-fee-list',
  templateUrl: './fee-list.component.html',
  styleUrls: ['./fee-list.component.css']
})
export class FeeListComponent implements OnInit {

  displayedColumns: string[] = ['fee_Id','fee_Name', 'fee_Amount','fee_Type','actions'];
  myDatabase!: FeeService;
  dataSource!: myDataSource;
  fee_Id!: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialog: MatDialog,
    public http:HttpClient, private service: FeeService, private _snackBar: MatSnackBar) { }

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
    const dialogRef = this.dialog.open(AddFeeDialogComponent, {
      data: {FeeData: {} }
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

  startEdit(fee_Id: number, fee_Name: string, fee_Amount: number, feeType_Id:number, feeType_Name:string ) {
    this.fee_Id = fee_Id;

    const dialogRef = this.dialog.open(EditFeeDialogComponent, {
      data: {fee_Id: fee_Id, fee_Name:fee_Name, fee_Amount:fee_Amount, feeType_Id: feeType_Id, feeType_Name:feeType_Name}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.fee_Id === this.fee_Id);
        // Then you update that record using data from dialogData (values you enetered)
        this.myDatabase.dataChange.value[foundIndex] = this.service.getDialogData();
        // And lastly refresh table
        this.refreshTable();
        this.reload();
      }
    });

}

deleteItem(fee_Id: number, fee_Name: string, fee_Amount: number, feeType_Id:number) {

  this.fee_Id = fee_Id;
  const dialogRef = this.dialog.open(DeleteFeeDialogComponent, {
    data: {fee_Id: fee_Id, fee_Name: fee_Name, fee_Amount: fee_Amount, feeType_Id:feeType_Id}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.fee_Id === this.fee_Id);
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
  this.myDatabase = new FeeService(this.http);
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

export class myDataSource extends DataSource<FeeData> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: FeeData[] = [];
  renderedData: FeeData[] = [];

  constructor(public _myDatabase: FeeService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<FeeData[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._myDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._myDatabase.getAllFees();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._myDatabase.data.slice().filter((fee: FeeData) => {
          const searchStr = (fee.fee_Id + fee.fee_Name + fee.fee_Amount + fee.feeType_Id +  fee.feeType_Name).toLowerCase();
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

  sortData(data: FeeData[]): FeeData[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '' ;
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'fee_Id': [propertyA, propertyB] = [a.fee_Id, b.fee_Id]; break;
        case 'fee_Amount': [propertyA, propertyB] = [a.fee_Amount, b.fee_Amount]; break;
        case 'feeType_Id': [propertyA, propertyB] = [a.feeType_Id, b.feeType_Id]; break;
        case 'feeType_Name': [propertyA, propertyB] = [a.feeType_Name, b.feeType_Name]; break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
