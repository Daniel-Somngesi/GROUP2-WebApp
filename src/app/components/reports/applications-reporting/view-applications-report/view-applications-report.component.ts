import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationReportOverview, ApplicationReportEntry } from 'src/app/Interface/reports.types';
import { ReportingService } from 'src/app/services/reporting/reporting.service';

import jsPDF from "jspdf";
import "jspdf-autotable";
import domtoimage from 'dom-to-image';
import { isToday } from 'date-fns';
import { IdNameValuePair } from 'src/app/Interface/shared.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationStatusService } from 'src/app/services/application-statuses/application-status.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  applicationStatuses: IdNameValuePair[] = [];

  filterForm: FormGroup;



  constructor(
    private _reportingService: ReportingService,
    private _router: Router,
    private _applicationStatus: ApplicationStatusService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar


  ) {
    this.fromDate = localStorage.getItem('applications-report-from-date');
    this.toDate = localStorage.getItem('applications-report-to-date');
  }

  ngOnInit(): void {

    if (this.fromDate != null && this.toDate != null) {
      this._getApplicationFromServer();
      this._getApplicationStatusFromServer();

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

  private _getApplicationStatusFromServer() {
    this._applicationStatus.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            this.applicationStatuses = event.body as IdNameValuePair[];
            this._buildFilterForm();
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

  onFilterSubmittion(specialNeeds, statusid) {

    if (this.filterForm.valid) {
      let payload: any = {};

      if (this.FilterToDate.value < this.FilterFromDate.value) {
        this.openSnackBar("End start should be greater than from date", "Error");
      }
      else {
        payload['SpecialNeeds'] = specialNeeds;
        payload['Status'] = statusid;
        payload['FromDate'] = this.FilterFromDate.value;
        payload['ToDate'] = this.FilterToDate.value;
        console.log(payload);

        this._reportingService.getApplicationsByFilter(payload)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.reportOverview = event.body as ApplicationReportOverview;
              console.log(this.reportOverview);
              this.entries = this.reportOverview.applications as ApplicationReportEntry[];
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


    }
    else {
      this.openSnackBar("Provide all required fields", "Error")
    }

  }

  private _buildFilterForm() {
    this.filterForm = this._formBuilder.group({
      FilterFromDate: ['', [Validators.required]],
      FilterToDate: ['', [Validators.required]],
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  get FilterFromDate() { return this.filterForm.get('FilterFromDate'); }
  get FilterToDate() { return this.filterForm.get('FilterToDate'); }

}
