import { DeleteAllergyDialogComponent } from './../delete-allergy-dialog/delete-allergy-dialog.component';
import { EditAllergyDialogComponent } from './../edit-allergy-dialog/edit-allergy-dialog.component';
import { AddAllergyDialogComponent } from './../add-allergy-dialog/add-allergy-dialog.component';
import { AllergyData } from './../../../Interface/Interface';
import { AllergyService } from './../../../services/allergy.service';
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
  selector: 'app-allergy-list',
  templateUrl: './allergy-list.component.html',
  styleUrls: ['./allergy-list.component.css']
})
export class AllergyListComponent implements OnInit {

  displayedColumns: string[] = ['allergy_Name','actions'];
  myDatabase!: AllergyService;
  dataSource!: myDataSource;
 allergy_Id!: number;
 horizontalPosition: MatSnackBarHorizontalPosition = 'center';
 verticalPosition: MatSnackBarVerticalPosition = 'bottom';

 constructor(public dialog: MatDialog,
  public http:HttpClient, private service: AllergyService, private _snackBar: MatSnackBar) { }

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
    const dialogRef = this.dialog.open(AddAllergyDialogComponent, {
      data: {AllergyData: {} }
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

  startEdit(allergy_Id: number, allergy_Name: string ) {
    this.allergy_Id = allergy_Id;

    const dialogRef = this.dialog.open(EditAllergyDialogComponent, {
      data: {allergy_Id: allergy_Id, allergy_Name: allergy_Name}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.allergy_Id === this.allergy_Id);
        // Then you update that record using data from dialogData (values you enetered)
        this.myDatabase.dataChange.value[foundIndex] = this.service.getDialogData();
        // And lastly refresh table
        this.reload();
        this.refreshTable();
      }
    });
  }

  deleteItem(allergy_Id: number, allergy_Name: string) {

    this.allergy_Id = allergy_Id;
    const dialogRef = this.dialog.open(DeleteAllergyDialogComponent, {
      data: {allergy_Id: allergy_Id, allergy_Name: allergy_Name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.allergy_Id === this.allergy_Id);
        // for delete we use splice in order to remove single object from DataService
        this.myDatabase.dataChange.value.splice(foundIndex, 1);
        this.reload();
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
    this.reload();
  }

  public loadData() {
    this.myDatabase = new AllergyService(this.http);
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

export class myDataSource extends DataSource<AllergyData> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: AllergyData[] = [];
  renderedData: AllergyData[] = [];

  constructor(public _myDatabase: AllergyService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<AllergyData[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._myDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._myDatabase.getAllAllergies();

    return merge(...displayDataChanges).pipe(map( () => {
      // Filter data
      this.filteredData = this._myDatabase.data.slice().filter((allergy: AllergyData) => {
        const searchStr = (allergy.allergy_Id + allergy.allergy_Name).toLowerCase();
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

sortData(data: AllergyData[]): AllergyData[] {
  if (!this._sort.active || this._sort.direction === '') {
    return data;
  }

  return data.sort((a, b) => {
    let propertyA: number | string = '' ;
    let propertyB: number | string = '';

    switch (this._sort.active) {
      case 'allergy_Id': [propertyA, propertyB] = [a.allergy_Id, b.allergy_Id]; break;
      case 'allergy_Name': [propertyA, propertyB] = [a.allergy_Name, b.allergy_Name]; break;
    }
    const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
    const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

    return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
  });
}
}
