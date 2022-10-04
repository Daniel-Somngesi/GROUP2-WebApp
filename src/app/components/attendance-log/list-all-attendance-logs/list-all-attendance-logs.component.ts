import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AttendanceLog } from 'src/app/helpers/types/attendance-log.types';
import { AttendanceLogService } from 'src/app/services/attendance-log/attendance-log.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-all-attendance-logs',
  templateUrl: './list-all-attendance-logs.component.html',
  styleUrls: ['./list-all-attendance-logs.component.css']
})
export class ListAllAttendanceLogsComponent implements OnInit {
  displayProgressSpinner = false;
  dataSource;
  today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.today.getFullYear();
  time = this.today.toLocaleTimeString();
  displayedColumns: string[] = ['name', 'date', 'timIn', 'timeOut'];
  dateGenerated = this.dd + '-' + this.mm + '-' + this.yyyy;

  logs: AttendanceLog[] = [];
  log: AttendanceLog;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _attendanceLogService: AttendanceLogService

  ) {
  }

  ngOnInit(): void {
    this._getDataFromServer();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _getDataFromServer() {
    this._attendanceLogService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as AttendanceLog[];
            this.logs = res;
            this.dataSource = new MatTableDataSource<AttendanceLog>(this.logs);
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

  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    console.log(element)
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.dateGenerated + '-attendance-log.xlsx');

  }

  private _openSnackBar(message: string, action: string, _duration: number) {
    this._snackBar.open(message, action, {
      duration: _duration,
    });
  }


}


