import { DeleteSurveyDialogComponent } from './../delete-survey-dialog/delete-survey-dialog.component';
import { EditSurveyDialogComponent } from './../edit-survey-dialog/edit-survey-dialog.component';
import { SurveyData } from './../../../Interface/Interface';
import { AddSurveyDialogComponent } from './../add-survey-dialog/add-survey-dialog.component';
import { SurveyService } from './../../../services/survey.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {

  displayedColumns: string[] = ['survey', 'startDate','endDate', 'actions'];
  myDatabase!: SurveyService;
  dataSource!: myDataSource;
  survey_Id!: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public dialog: MatDialog,
    public http:HttpClient, private service: SurveyService,
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
    const dialogRef = this.dialog.open(AddSurveyDialogComponent, {
      data: {SurveyData: {} }
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

  startEdit(survey_Id: number, survey_Name: string, startDate: Date, endDate: Date) {
    this.survey_Id = survey_Id;

    const dialogRef = this.dialog.open(EditSurveyDialogComponent, {
      data: {survey_Id:survey_Id, survey_Name:survey_Name, startDate:startDate, endDate:endDate}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.survey_Id === this.survey_Id);
        // Then you update that record using data from dialogData (values you enetered)
        this.myDatabase.dataChange.value[foundIndex] = this.service.getDialogData();
        // And lastly refresh table
        this.reload();
        this.refreshTable();
        this.SavedSuccessful(0);
      }
    });
  }

  deleteItem(survey_Id: number, survey_Name: string, startDate: Date, endDate: Date) {

    this.survey_Id = survey_Id;
    const dialogRef = this.dialog.open(DeleteSurveyDialogComponent, {
      data: {survey_Id:survey_Id, survey_Name: survey_Name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.survey_Id === this.survey_Id);
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

  }

  public loadData() {
    this.myDatabase = new SurveyService(this.http);
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

export class myDataSource extends DataSource<SurveyData> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: SurveyData[] = [];
  renderedData: SurveyData[] = [];

  constructor(public _myDatabase: SurveyService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<SurveyData[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._myDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._myDatabase.getAllSurveys();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._myDatabase.data.slice().filter((survey: SurveyData) => {
          const searchStr = (survey.survey_Id + survey.survey_Name + survey.startDate + survey.endDate);
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

  sortData(data: SurveyData[]): SurveyData[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string | Date = '' ;
      let propertyB: number | string  | Date= '';

      switch (this._sort.active) {
        case 'survey_Id': [propertyA, propertyB] = [a.survey_Id, b.survey_Id]; break;
        case 'survey_Name': [propertyA, propertyB] = [a.survey_Name, b.survey_Name]; break;
        case 'startDate': [propertyA, propertyB] = [a.startDate, b.startDate]; break;
        case 'endDate': [propertyA, propertyB] = [a.endDate, b.endDate]; break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });



  }

}
