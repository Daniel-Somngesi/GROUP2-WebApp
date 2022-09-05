import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import jsPDF from "jspdf";
import "jspdf-autotable";
import domtoimage from 'dom-to-image';
import { isToday } from 'date-fns';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { SchoolReportOverview, SchoolClassAttendance, SchoolEvaluationSurveyReport, SchoolEvaluationSurveyReportForGraph } from 'src/app/Interface/reports.types';
import { ReportingService } from 'src/app/services/reporting/reporting.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { LegendPosition } from '@swimlane/ngx-charts';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';


@Component({
  selector: 'app-school-evaluation-report',
  templateUrl: './school-evaluation-report.component.html',
  styleUrls: ['./school-evaluation-report.component.css']
})
export class SchoolEvaluationReportComponent implements OnInit {
  displayProgressSpinner = false;
  reportDate;

  today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.today.getFullYear();
  time = this.today.toLocaleTimeString();

  dateGenerated = this.dd + '-' + this.mm + '-' + this.yyyy;

  @ViewChild('content') content: ElementRef;
  topRecords: SchoolEvaluationSurveyReport[];
  graphRecords: SchoolEvaluationSurveyReportForGraph[];

  singleDataOption: any[] = [];
  multiDataOptions: any[] = [];

  // options
  legendTitle: string = 'Legend Title';
  legendTitleMulti: string = 'Time Marker';
  legend: boolean = true;
  legendlocation = LegendPosition.Right;
  xAxis: boolean = true;
  yAxis: boolean = true;
  yAxisLabel: string = 'Axis Label';
  xAxisLabel: string = 'Axis Label';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  maxXAxisTickLength: number = 30;
  maxYAxisTickLength: number = 30;
  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  rotateXAxisTicks: boolean = false;

  xAxisTicks: any[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
  yAxisTicks: any[] = [5, 10, 15, 20, 25,30]

  animations: boolean = true; // animations on load

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars

  gradient: boolean = true;
  colorScheme: any = {
    domain: ['aqua', 'blue', 'chartreuse', 'crimson', 'fuchsia', 'gray',
      'green', 'indigo', 'lime', 'magenta', 'navy', 'maroon', 'olive',
      'purple', 'red', 'silver', 'teal', 'yellow']
  };

  activeEntries: any[] = []
  barPadding: number = 5
  tooltipDisabled: boolean = false;

  yScaleMax: number = 4000;

  roundEdges: boolean = false;

  constructor(
    private _reportingService: ReportingService,
    private _router: Router,
    private _matSnackBar: MatSnackBar,
    private _mixpanelService:MixpanelService
  ) {
    this._mixpanelService.track("View School Evaluation Report");
  }

  ngOnInit(): void {
    this._getApplicationFromServer();
    this._getGrapghValues();
  }

  private _getApplicationFromServer() {
    this._reportingService.getSchoolEvalutationTop()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            this.topRecords = event.body as SchoolEvaluationSurveyReport[];

          }
        },
        error: (error) => {
          this.displayProgressSpinner = false;
          this._openErrorMessageSnackBar(error.error.message);
        },
        complete: () => {
          this.displayProgressSpinner = false;
        }
      });
  }

  private _getGrapghValues() {
    this._reportingService.getSchoolEvalutationGraph()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            this.graphRecords = event.body as SchoolEvaluationSurveyReportForGraph[];
            console.log(this.topRecords);
          }
        },
        error: (error) => {
          this.displayProgressSpinner = false;
          this._openErrorMessageSnackBar(error.error.message);
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

          filename = 'School_Evalutation_Report' + '.pdf';
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

  formatNumber(input: number): number {
    return input
  }

  formatString(input: string): string {
    return input.toUpperCase()
  }

}
