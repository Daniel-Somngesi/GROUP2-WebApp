import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from 'src/app/Interface/booking.types';
import { BookingService } from 'src/app/services/booking/booking.service';

@Component({
  selector: 'app-list-bookings',
  templateUrl: './list-bookings.component.html',
  styleUrls: ['./list-bookings.component.css']
})
export class ListBookingsComponent implements OnInit {
  displayProgressSpinner = false;
  dataSource;

  displayedColumns: string[] = ['bookingDateTime','bookingStatus', 'name', 'bookingType', 'parentFullName', 'slotDay', 'slotStartTime', 'slotEndTime'];

  bookings: Booking[] = [];
  booking: Booking;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _bookingService: BookingService,
    private _snackBar: MatSnackBar,

  ) {
  }

  ngOnInit(): void {
    this._getBookingsFromServer();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _getBookingsFromServer() {
    this._bookingService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Booking[];
            this.bookings = res;
            this.dataSource = new MatTableDataSource<Booking>(this.bookings);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.displayProgressSpinner = false;
          }
        },
        error: (error) => {
          this.displayProgressSpinner = false;
        },
        complete: () => {
          this.displayProgressSpinner = false;
        }
      });
  }

  onDeleteBooking(booking: Booking) {

    this._bookingService.delete(booking.id)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
          }
          if (event.type == HttpEventType.Response) {
            this.openSnackBar("Booking Cancelled", "Success");
            this._getBookingsFromServer();
          }
        },
        error: (error) => {
          this.openSnackBar(error.error.message, "Error!");
        },
        complete: () => {
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}


