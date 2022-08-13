import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolReportOverview, SchoolClassAttendance, ApplicationReportOverview, ApplicationReportEntry } from 'src/app/Interface/reports.types';
import { ReportingService } from 'src/app/services/reporting/reporting.service';

import jsPDF from "jspdf";
import "jspdf-autotable";
import domtoimage from 'dom-to-image';
import { isToday } from 'date-fns';

@Component({
  selector: 'app-view-applications-report',
  templateUrl: './view-applications-report.component.html',
  styleUrls: ['./view-applications-report.component.css']
})
export class ViewApplicationsReportComponent implements OnInit {
  displayProgressSpinner = false;
  fromDate;
  toDate;

  today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.today.getFullYear();
  time = this.today.toLocaleTimeString();

  dateGenerated = this.dd + '-' + this.mm + '-' + this.yyyy;

  @ViewChild('content') content: ElementRef;

  reportOverview: ApplicationReportOverview;
  entries: ApplicationReportEntry[];

  constructor(
    private _reportingService: ReportingService,
    private _router: Router

  ) {


    this.fromDate = localStorage.getItem('applications-report-from-date');
    this.toDate = localStorage.getItem('applications-report-to-date');
  }

  ngOnInit(): void {

    if (this.fromDate != null && this.toDate != null) {
      this._getApplicationFromServer();
    }
    else {
      //Go back to reports dashboard if date not in local storage
      this._router.navigate(['reports-dashboard']);
    }
  }

  private _getApplicationFromServer() {
    let payload: any = {};
    let formattedFromDate = this.fromDate as Date;
    let formattedToDate = this.toDate as Date;
    payload['FromDate'] = new Date(formattedFromDate);
    payload['ToDate'] = new Date(formattedToDate);

    this._reportingService.getApplications(payload)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            this.reportOverview = event.body as ApplicationReportOverview;
            this.entries = this.reportOverview.applications as ApplicationReportEntry[];

            console.log(this.reportOverview);

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
