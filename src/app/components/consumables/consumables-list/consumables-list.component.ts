import { DeleteConsumablesDialogComponent } from './../delete-consumables-dialog/delete-consumables-dialog.component';
import { EditConsumablesDialogComponent } from './../edit-consumables-dialog/edit-consumables-dialog.component';
import { AddConsumablesDialogComponent } from './../add-consumables-dialog/add-consumables-dialog.component';
import { ConsumablesData } from './../../../Interface/Interface';
import { ConsumablesService } from './../../../services/consumables.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-consumables-list',
  templateUrl: './consumables-list.component.html',
  styleUrls: ['./consumables-list.component.css']
})
export class ConsumablesListComponent implements OnInit {

  displayedColumns: string[] = ['Name','Description','Quantity','actions'];
  myDatabase!: ConsumablesService;
  dataSource!: myDataSource;
  consumable_Id!: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialog: MatDialog,
    public http:HttpClient, private service: ConsumablesService,
     private _snackBar: MatSnackBar) { }

    @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort!: MatSort;
    @ViewChild('filter',  {static: true}) filter!: ElementRef;

  ngOnInit(): void {
    this.loadData();
  }

  SavedSuccessful(isUpdate:any) {
    if (isUpdate == 0) {
      this._snackBar.open('Record Updated Successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 1) {
      this._snackBar.open('Record Saved Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 2) {
      this._snackBar.open('Record Deleted Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  reload() {
    this.loadData();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddConsumablesDialogComponent, {
      data: {ConsumablesData: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.myDatabase.dataChange.value.push(this.service.getDialogData());
        this.refreshTable();
        this.reload();
        this.SavedSuccessful(1);
      }
    });
  }

  startEdit(consumable_Id: number, name: string, description: string, quantity: number) {
    this.consumable_Id = consumable_Id;

    const dialogRef = this.dialog.open(EditConsumablesDialogComponent, {
      data: {consumable_Id:consumable_Id, name:name, description, quantity}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.consumable_Id === this.consumable_Id);
        // Then you update that record using data from dialogData (values you enetered)
        this.myDatabase.dataChange.value[foundIndex] = this.service.getDialogData();
        // And lastly refresh table
        this.refreshTable();
        this.reload();
        this.SavedSuccessful(0);
      }
    });
  }

  deleteItem(consumable_Id: number, name: string, description: string, quantity: number) {

    this.consumable_Id = consumable_Id;
    const dialogRef = this.dialog.open(DeleteConsumablesDialogComponent, {
      data: {consumable_Id: consumable_Id, name: name, description: description, quantity: quantity}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.consumable_Id === this.consumable_Id);
        // for delete we use splice in order to remove single object from DataService
        this.myDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
        this.reload();
        this.SavedSuccessful(2)
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
    window.location.reload();
  }

  public loadData() {
    this.myDatabase = new ConsumablesService(this.http);
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

export class myDataSource extends DataSource<ConsumablesData> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: ConsumablesData[] = [];
  renderedData: ConsumablesData[] = [];

  constructor(public _myDatabase: ConsumablesService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ConsumablesData[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._myDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._myDatabase.getAllConsumables();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._myDatabase.data.slice().filter((consumable: ConsumablesData) => {
          const searchStr = (consumable.consumable_Id + consumable.name + consumable.description +
            consumable.quantity );
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

  sortData(data: ConsumablesData[]): ConsumablesData[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '' ;
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'consumable_Id': [propertyA, propertyB] = [a.consumable_Id, b.consumable_Id]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'description': [propertyA, propertyB] = [a.description, b.description]; break;
        case 'quantity': [propertyA, propertyB] = [a.quantity, b.quantity]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });



  }

}
