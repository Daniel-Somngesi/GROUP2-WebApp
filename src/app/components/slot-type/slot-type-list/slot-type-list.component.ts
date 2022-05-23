
import { EditSlotTypeDialogComponent } from './../edit-slot-type-dialog/edit-slot-type-dialog.component';
import { SlotTypeData } from './../../../Interface/Interface';

import { SlotTypeService } from './../../../services/slot-type.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddSlotTypeDialogComponent } from '../add-slot-type-dialog/add-slot-type-dialog.component';
import { DeleteSlotTypeDialogComponent } from '../delete-slot-type-dialog/delete-slot-type-dialog.component';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-slot-type-list',
  templateUrl: './slot-type-list.component.html',
  styleUrls: ['./slot-type-list.component.css']
})
export class SlotTypeListComponent implements OnInit {

  displayedColumns: string[] = ['Name','actions'];
  myDatabase!: SlotTypeService;
  dataSource!: myDataSource;
  slotType_Id!: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialog: MatDialog,
    public http:HttpClient, private service: SlotTypeService,
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
      const dialogRef = this.dialog.open(AddSlotTypeDialogComponent, {
        data: {SlotTypeData: {} }
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

    startEdit(slotType_Id: number, name: string) {
      this.slotType_Id = slotType_Id;

      const dialogRef = this.dialog.open(EditSlotTypeDialogComponent, {
        data: {slotType_Id:slotType_Id, name:name}
      });

      dialogRef.afterClosed().subscribe(result => {

        if (result === 1) {
          // When using an edit things are little different, firstly we find record inside DataService by id
          const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.slotType_Id === this.slotType_Id);
          // Then you update that record using data from dialogData (values you enetered)
          this.myDatabase.dataChange.value[foundIndex] = this.service.getDialogData();
          // And lastly refresh table
          this.reload();
          this.refreshTable();
          this.SavedSuccessful(0);
        }
      });
    }

    deleteItem(slotType_Id: number, name: string) {

      this.slotType_Id = slotType_Id;
      const dialogRef = this.dialog.open(DeleteSlotTypeDialogComponent, {
        data: {slotType_Id:slotType_Id, name: name}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.slotType_Id === this.slotType_Id);
          // for delete we use splice in order to remove single object from DataService
          this.myDatabase.dataChange.value.splice(foundIndex, 1);
          this.reload();
          this.refreshTable();
          this.SavedSuccessful(2)
        }
      });
    }

    private refreshTable() {
      this.paginator._changePageSize(this.paginator.pageSize);
      window.location.reload();
    }

    public loadData() {
      this.myDatabase = new SlotTypeService(this.http);
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

  export class myDataSource extends DataSource<SlotTypeData> {
    _filterChange = new BehaviorSubject('');

    get filter(): string {
      return this._filterChange.value;
    }

    set filter(filter: string) {
      this._filterChange.next(filter);
    }

    filteredData: SlotTypeData[] = [];
    renderedData: SlotTypeData[] = [];

    constructor(public _myDatabase: SlotTypeService,
                public _paginator: MatPaginator,
                public _sort: MatSort) {
      super();
      // Reset to the first page when the user changes the filter.
      this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<SlotTypeData[]> {
      // Listen for any changes in the base data, sorting, filtering, or pagination
      const displayDataChanges = [
        this._myDatabase.dataChange,
        this._sort.sortChange,
        this._filterChange,
        this._paginator.page
      ];

      this._myDatabase.getAllSlotTypes();


      return merge(...displayDataChanges).pipe(map( () => {
          // Filter data
          this.filteredData = this._myDatabase.data.slice().filter((slottype: SlotTypeData) => {
            const searchStr = (slottype.slotType_Id + slottype.name);
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

    sortData(data: SlotTypeData[]): SlotTypeData[] {
      if (!this._sort.active || this._sort.direction === '') {
        return data;
      }

      return data.sort((a, b) => {
        let propertyA: number | string = '' ;
        let propertyB: number | string = '';

        switch (this._sort.active) {
          case 'slotType_Id': [propertyA, propertyB] = [a.slotType_Id, b.slotType_Id]; break;
          case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        }

        const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
        const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

        return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
      });



    }
}
