import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionLog } from 'src/app/Interface/logs.types';
import { LogTransactionsService } from 'src/app/services/log-transactions/log-transactions.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { ViewLogValuesComponent } from '../view-log-values/view-log-values.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-list-transaction-logs',
  templateUrl: './list-transaction-logs.component.html',
  styleUrls: ['./list-transaction-logs.component.css']
})
export class ListTransactionLogsComponent implements OnInit {
  displayProgressSpinner = false;
  dataSource;

  displayedColumns: string[] = ['dateTime', 'username', 'table', 'operation', 'actions'];

  logs: TransactionLog[] = [];
  log: TransactionLog;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _snackBar: MatSnackBar,
    private _matDialog: MatDialog,
    private _matSnackBar: MatSnackBar,
    private _logTranscationsService: LogTransactionsService
  ) {
  }

  ngOnInit(): void {
    this._getDataFromServer();
  }


  exportTojson() {

    let exportData = this.logs;
    return saveAs(
      new Blob([JSON.stringify(exportData, null, 2)], { type: 'JSON' }), 'transactions-log.json'
    );
  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onViewValues(element: TransactionLog) {
    let dialogRef = this._matDialog.open(ViewLogValuesComponent, {
      width: "80%",
      height: "auto",
      data: {
        record: element
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    });
  }

  private _getDataFromServer() {
    this._logTranscationsService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as TransactionLog[];
            this.logs = res;
            this.dataSource = new MatTableDataSource<TransactionLog>(this.logs);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.displayProgressSpinner = false;
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
