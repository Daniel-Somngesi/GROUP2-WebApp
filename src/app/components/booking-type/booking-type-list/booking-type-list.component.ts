import { DeleteBookingTypeComponent } from './../delete-booking-type/delete-booking-type.component';
import { EditBookingTypeComponent } from '../edit-booking-type/edit-booking-type.component';
import { AddBookingTypeComponent } from '../add-booking-type/add-booking-type.component';
import { HttpClient } from '@angular/common/http';
import { BookingTypeService } from './../../../services/booking-type.service';
import { BookingTypeData } from './../../../Interface/Interface';
import { Component, ElementRef, OnInit, ViewChild ,Inject} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import {map} from 'rxjs/operators';



@Component({
  selector: 'app-booking-type-list',
  templateUrl: './booking-type-list.component.html',
  styleUrls: ['./booking-type-list.component.css']
})

export class BookingTypeListComponent implements OnInit {


  displayedColumns: string[] = ['bookingType_Name','bookingType_Description', 'actions'];
  myDatabase!: BookingTypeService;
  dataSource!: myDataSource;
  bookingType_ID!: any;

  constructor(public service:BookingTypeService,
   public dialog: MatDialog,
   public http:HttpClient,
   private _snackBar: MatSnackBar) {
 }

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
     const dialogRef = this.dialog.open(AddBookingTypeComponent, {
       data: {BookingTypeData: {} }
     });

     dialogRef.afterClosed().subscribe(result => {
       if (result === 1) {
         // After dialog is closed we're doing frontend updates
         // For add we're just pushing a new row inside DataService
         this.myDatabase.dataChange.value.push
         (this.service.getDialogData());
         this.reload();
         this.refreshTable();
       }
     });
   }

   startEdit(bookingType_ID: number, bookingType_Name: string, bookingType_Description: string ) {
     this.bookingType_ID = bookingType_ID;
     // index row is used just for debugging proposes and can be removed

     const dialogRef = this.dialog.open(EditBookingTypeComponent, {
       data: {bookingType_ID: bookingType_ID, bookingType_Name: bookingType_Name, bookingType_Description: bookingType_Description }
     });

     dialogRef.afterClosed().subscribe(result => {

       if (result === 1) {
         // When using an edit things are little different, firstly we find record inside DataService by id
         const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.bookingType_ID === this.bookingType_ID);
         // Then you update that record using data from dialogData (values you enetered)
         this.myDatabase.dataChange.value[foundIndex] = this.service.getDialogData();
         // And lastly refresh table
         this.reload();
         this.refreshTable();
       }
     });
   }

   deleteItem(bookingType_ID: number, bookingType_Name: string, bookingType_Description: string) {

     this.bookingType_ID = bookingType_ID;
     const dialogRef = this.dialog.open(DeleteBookingTypeComponent, {
       data: {bookingType_ID: bookingType_ID,bookingType_Name: bookingType_Name, bookingType_Description: bookingType_Description}
     });

     dialogRef.afterClosed().subscribe(result => {
       if (result === 1) {
         const foundIndex = this.myDatabase.dataChange.value.findIndex(x => x.bookingType_ID === this.bookingType_ID);
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
     this.myDatabase = new BookingTypeService(this.http);
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

 export class myDataSource extends DataSource<BookingTypeData> {
   _filterChange = new BehaviorSubject('');

   get filter(): string {
     return this._filterChange.value;
   }

   set filter(filter: string) {
     this._filterChange.next(filter);
   }

   filteredData: BookingTypeData[] = [];
   renderedData: BookingTypeData[] = [];

   constructor(public _myDatabase: BookingTypeService,
               public _paginator: MatPaginator,
               public _sort: MatSort) {
     super();
     // Reset to the first page when the user changes the filter.
     this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
   }

   /** Connect function called by the table to retrieve one stream containing the data to render. */
   connect(): Observable<BookingTypeData[]> {
     // Listen for any changes in the base data, sorting, filtering, or pagination
     const displayDataChanges = [
       this._myDatabase.dataChange,
       this._sort.sortChange,
       this._filterChange,
       this._paginator.page
     ];

     this._myDatabase.getAllBookingTypes();


     return merge(...displayDataChanges).pipe(map(() => {
         // Filter data
         this.filteredData = this._myDatabase.data.slice().filter((bookingType: BookingTypeData) => {
           const searchStr = (bookingType.bookingType_ID + bookingType.bookingType_Name ).toLowerCase();
           return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
         });

         // Sort filtered data + bookingType.bookingType_Description
         const sortedData = this.sortData(this.filteredData.slice());


         // Grab the page's slice of the filtered sorted data.
         const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
         this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
         return this.renderedData;
       }
     ));
   }


   disconnect() {}

   sortData(data: BookingTypeData[]): BookingTypeData[] {
     if (!this._sort.active || this._sort.direction === '') {
       return data;
     }

     return data.sort((a, b) => {
       let propertyA: number | string = '' ;
       let propertyB: number | string = '';

       switch (this._sort.active) {
         case 'bookingType_ID': [propertyA, propertyB] = [a.bookingType_ID, b.bookingType_ID]; break;
         case 'bookingType_Name': [propertyA, propertyB] = [a.bookingType_Name, b.bookingType_Name]; break;
        //  \\case 'bookingType_Description': [propertyA , propertyB] = [a.bookingType_Description, b.bookingType_Description]; break;
       }

       const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
       const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

       return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
     });


   }

  }
