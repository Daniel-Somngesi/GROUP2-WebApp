import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolClassAttendance, SchoolReportOverview } from 'src/app/Interface/reports.types';
import { ReportingService } from 'src/app/services/reporting/reporting.service';


import jsPDF from "jspdf";
import "jspdf-autotable";
import domtoimage from 'dom-to-image';
import { isToday } from 'date-fns';

@Component({
  selector: 'app-view-class-attendance-report',
  templateUrl: './view-class-attendance-report.component.html',
  styleUrls: ['./view-class-attendance-report.component.css']
})
export class ViewClassAttendanceReportComponent implements OnInit {
  displayProgressSpinner = false;
  reportDate;

  today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.today.getFullYear();
  time = this.today.toLocaleTimeString();

  dateGenerated = this.dd + '-' + this.mm + '-' + this.yyyy;

  @ViewChild('content') content: ElementRef;

  reportOverview: SchoolReportOverview;
  attendances: SchoolClassAttendance[];

  constructor(
    private _reportingService: ReportingService,
    private _router: Router

  ) {


    this.reportDate = localStorage.getItem('class-attendance-report-date');
  }

  ngOnInit(): void {

    if (this.reportDate != null) {
      this._getApplicationFromServer();
    }
    else {
      //Go back to reports dashboard if date not in local storage
      this._router.navigate(['reports-dashboard']);
    }
  }

  private _getApplicationFromServer() {
    let payload: any = {};
    let formattedDate = this.reportDate as Date;
    payload['Date'] = new Date(formattedDate);

    this._reportingService.getSchoolClassAttendance(payload)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            this.reportOverview = event.body as SchoolReportOverview;
            this.attendances = this.reportOverview.children as SchoolClassAttendance[];

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

          filename = 'School_Class_Attendance' + '.pdf';
          doc.save(filename);

        };


      })
      .catch(function (error) {

        // Error Handling

      });

  }

}
