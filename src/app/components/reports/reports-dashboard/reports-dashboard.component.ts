import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenerateApplicationsReportComponent } from '../applications-reporting/generate-applications-report/generate-applications-report.component';
import { GenerateChildAttendanceReportDialogComponent } from '../child-attendance-reporting/generate-child-attendance-report-dialog/generate-child-attendance-report-dialog.component';

@Component({
  selector: 'app-reports-dashboard',
  templateUrl: './reports-dashboard.component.html',
  styleUrls: ['./reports-dashboard.component.css']
})
export class ReportsDashboardComponent implements OnInit {

  constructor(
    private _matDialog:MatDialog
  ) { }

  ngOnInit(): void {
  }

  onGenerateClassAttendanceReport() {
    let dialog = this._matDialog.open(GenerateChildAttendanceReportDialogComponent, {
      width: "50%",
      height: "auto",
      data: {

      }
    });

    dialog.afterClosed().subscribe(result => {

    });

  }
  onGenerateApplicationReport() {
    let dialog = this._matDialog.open(GenerateApplicationsReportComponent, {
      width: "50%",
      height: "auto",
      data: {

      }
    });

    dialog.afterClosed().subscribe(result => {

    });

  }

}
