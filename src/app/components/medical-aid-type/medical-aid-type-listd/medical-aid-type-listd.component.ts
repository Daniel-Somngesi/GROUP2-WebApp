import { DeleteMedicalAidTypeDialogComponent } from './../delete-medical-aid-type-dialog/delete-medical-aid-type-dialog.component';
import { EditMedicalAidTypeDialogComponent } from './../edit-medical-aid-type-dialog/edit-medical-aid-type-dialog.component';
import { AddMedicalAidTypeDialogComponent } from './../add-medical-aid-type-dialog/add-medical-aid-type-dialog.component';
import { MedicalAidTypeData } from './../../../Interface/Interface';
import { MedicalAidTypeService } from './../../../services/medical-aid-type.service';
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
  selector: 'app-medical-aid-type-listd',
  templateUrl: './medical-aid-type-listd.component.html',
  styleUrls: ['./medical-aid-type-listd.component.css']
})
export class MedicalAidTypeListdComponent implements OnInit {

  displayedColumns: string[] = ['medicalAidTypeName','actions'];
  myDatabase!: MedicalAidTypeService;
  dataSource!: myDataSource;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  medicalAidTypeId!: number;

  constructor(public dialog: MatDialog,
    public http:HttpClient, private service: MedicalAidTypeService, private _snackBar: MatSnackBar) { }


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
    const dialogRef = this.dialog.open(AddMedicalAidTypeDialogComponent, {
      data: {MedicalAidTypeData: {} }
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

  startEdit(medicalAidTypeId: number, medicalAidTypeName: string) {
    this.medicalAidTypeId = medicalAidTypeId;

    const dialogRef = this.dialog.open(EditMedicalAidTypeDialogComponent, {
      data: {medicalAidTypeId:medicalAidTypeId, medicalAidTypeName:medicalAidTypeName}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.medicalAidTypeId === this.medicalAidTypeId);
        // Then you update that record using data from dialogData (values you enetered)
        this.myDatabase.dataChange.value[foundIndex] = this.service.getDialogData();
        // And lastly refresh table
        this.refreshTable();
        this.reload();
        this.SavedSuccessful(0);
      }
    });
  }

  deleteItem(medicalAidTypeId: number, medicalAidTypeName: string) {
    this.medicalAidTypeId = medicalAidTypeId;
    const dialogRef = this.dialog.open(DeleteMedicalAidTypeDialogComponent, {
      data: {medicalAidTypeId: medicalAidTypeId, medicalAidTypeName: medicalAidTypeName}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.medicalAidTypeId === this.medicalAidTypeId);
        // for delete we use splice in order to remove single object from DataService
        this.myDatabase.dataChange.value.splice(foundIndex, 1);

        this.reload();
        this.SavedSuccessful(0);
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
    window.location.reload();
  }


  public loadData() {
    this.myDatabase = new MedicalAidTypeService(this.http);
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

export class myDataSource extends DataSource<MedicalAidTypeData> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: MedicalAidTypeData[] = [];
  renderedData: MedicalAidTypeData[] = [];

  constructor(public _myDatabase: MedicalAidTypeService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<MedicalAidTypeData[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._myDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._myDatabase.getAllMedicalAidTypes();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._myDatabase.data.slice().filter((medicaaidtype: MedicalAidTypeData) => {
          const searchStr = (medicaaidtype.medicalAidTypeId + medicaaidtype.medicalAidTypeName );
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

  sortData(data: MedicalAidTypeData[]): MedicalAidTypeData[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '' ;
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'medicalAidTypeId': [propertyA, propertyB] = [a.medicalAidTypeId, b.medicalAidTypeId]; break;
        case 'medicalAidTypeName': [propertyA, propertyB] = [a.medicalAidTypeName, b.medicalAidTypeName]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
