import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BookingReportOverview } from 'src/app/Interface/reports.types';
import { Slot } from 'src/app/Interface/slot.types';
import { ReportingService } from 'src/app/services/reporting/reporting.service';

import jsPDF from "jspdf";
import "jspdf-autotable";
import domtoimage from 'dom-to-image';
import { Booking } from 'src/app/Interface/booking.types';

@Component({
  selector: 'app-view-bookings-report',
  templateUrl: './view-bookings-report.component.html',
  styleUrls: ['./view-bookings-report.component.css']
})
export class ViewBookingsReportComponent implements OnInit {
  displayProgressSpinner = false;
  fromDate;
  toDate;

  today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.today.getFullYear();
  time = this.today.toLocaleTimeString();

  dateGenerated = this.dd + '-' + this.mm + '-' + this.yyyy;

  reportOverview: BookingReportOverview;
  slots: Slot[] = [];
  bookings: Booking[] = [];

  @ViewChild('content') content: ElementRef;

  constructor(
    private _router: Router,
    private _reportingService: ReportingService
  ) {
    this.fromDate = localStorage.getItem('bookings-report-from-date');
    this.toDate = localStorage.getItem('bookings-report-to-date');
  }

  ngOnInit(): void {
    if (this.fromDate != null && this.toDate != null) {
      this._getReportFromServer();
    }
    else {
      //Go back to reports dashboard if date not in local storage
      this._router.navigate(['reports-dashboard']);
    }
  }

  private _getReportFromServer() {
    let payload: any = {};
    let formattedFromDate = this.fromDate as Date;
    let formattedToDate = this.toDate as Date;
    payload['FromDate'] = new Date(formattedFromDate);
    payload['ToDate'] = new Date(formattedToDate);

    this._reportingService.getBookings(payload)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            this.reportOverview = event.body as BookingReportOverview;
            console.log(this.reportOverview);

            this.slots = this.reportOverview.slots as Slot[];
            this.bookings = this.reportOverview.bookings as Booking[];
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

  public downloadAsPDF() {
    let div = this.content.nativeElement;

    var img: any;
    var filename;
    var newImage: any;


    domtoimage.toPng(div, { bgcolor: '#fff' })
      .then(function (dataUrl) {

        img = new Image();
        img.src = dataUrl;
        newImage = img.src;

        img.onload = function () {

          var pdfWidth = img.width;
          var pdfHeight = img.height;

          var doc;

          if (pdfWidth > pdfHeight) {
            doc = new jsPDF('l', 'px', [pdfWidth, pdfHeight]);
          }
          else {
            doc = new jsPDF('p', 'px', [pdfWidth, pdfHeight]);
          }

          var width = doc.internal.pageSize.getWidth();
          var height = doc.internal.pageSize.getHeight();

          doc.addImage(newImage, 'PNG', 10, 10, width, height);

          filename = 'Applications_Report' + '.pdf';
          doc.save(filename);

        };


      })
      .catch(function (error) {

        // Error Handling

      });

  }

}
