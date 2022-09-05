import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import jsPDF from "jspdf";
import "jspdf-autotable";
import domtoimage from 'dom-to-image';
import { isToday } from 'date-fns';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { SchoolReportOverview, SchoolClassAttendance, WeeklyClassReport, WeeklyClassReportItem } from 'src/app/Interface/reports.types';
import { ReportingService } from 'src/app/services/reporting/reporting.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';

@Component({
  selector: 'app-view-weekly-attendance-report',
  templateUrl: './view-weekly-attendance-report.component.html',
  styleUrls: ['./view-weekly-attendance-report.component.css']
})
export class ViewWeeklyAttendanceReportComponent implements OnInit {
  displayProgressSpinner = false;
  reportDate;

  today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.today.getFullYear();
  time = this.today.toLocaleTimeString();

  dateGenerated = this.dd + '-' + this.mm + '-' + this.yyyy;

  @ViewChild('content') content: ElementRef;

  reportOverview: WeeklyClassReport;
  attendances: WeeklyClassReportItem[];
  overAll;

  constructor(
    private _reportingService: ReportingService,
    private _matSnackBar: MatSnackBar,
    private _mixpanelService:MixpanelService
  ) {
    this._mixpanelService.track("View Weekly Attendance Report");
  }

  ngOnInit(): void {
    this._getApplicationFromServer();
  }

  private _getApplicationFromServer() {
    this._reportingService.getWeeklyAttendance()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            this.reportOverview = event.body as WeeklyClassReport;
            this.attendances = this.reportOverview.items as WeeklyClassReportItem[];
            this.overAll = (this.reportOverview.presentTotal / this.reportOverview.expectedDays) * 100
          }
        },
        error: (error) => {
          this.displayProgressSpinner = false;
          this._openErrorMessageSnackBar(error.error.message)
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

          filename = 'Weekly_Class_Attendance' + '.pdf';
          doc.save(filename);

        };


      })
      .catch(function (error) {

        // Error Handling

      });

  }

  openSnackBar(message: string, action: string) {
    this._matSnackBar.open(message, action, {
      duration: 2000,
    });
  }

  private _openErrorMessageSnackBar(errorMessage: string) {
    const snackBar = this._matSnackBar.openFromComponent(CustomErrorSnackBarComponent, {
      data: {
        preClose: () => { snackBar.dismiss() },
        parent: errorMessage
      }
    });
  }

}
