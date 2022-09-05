import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GenerateBookingsReportComponent } from '../bookings-reporting/generate-bookings-report/generate-bookings-report.component';
import { GenerateChildAttendanceReportDialogComponent } from '../child-attendance-reporting/generate-child-attendance-report-dialog/generate-child-attendance-report-dialog.component';
import { GenerateConsumablesByClassReportComponent } from '../consumables-by-class/generate-consumables-by-class-report/generate-consumables-by-class-report.component';

@Component({
  selector: 'app-reports-dashboard',
  templateUrl: './reports-dashboard.component.html',
  styleUrls: ['./reports-dashboard.component.css']
})
export class ReportsDashboardComponent implements OnInit {

  constructor(
    private _matDialog: MatDialog,
    private _router: Router
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
    this._router.navigate(['school-evaluation-report']);
  }

  OnGenerateBookingReport() {
    let dialog = this._matDialog.open(GenerateBookingsReportComponent, {
      width: "50%",
      height: "auto",
      data: {

      }
    });

    dialog.afterClosed().subscribe(result => {

    });
  }
  onGenerateConsumablesByClassReport() {
    this._router.navigate(['consumables-by-class-report']);
  }

  onGoToWeeklyAttendanceReport() {
    this._router.navigate(['weekly-class-attendance-report']);
  }

  onGenerateConsumablesByChildReport() {
    this._router.navigate(['consumables-by-child-report']);
  }
}

