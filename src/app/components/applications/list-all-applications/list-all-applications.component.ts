import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Application } from 'src/app/Interface/Interface';
import { ApplicationsService } from 'src/app/services/applications/applications.service';
import { ViewApplicationDetailsComponent } from '../view-application-details/view-application-details.component';

@Component({
  selector: 'app-list-all-applications',
  templateUrl: './list-all-applications.component.html',
  styleUrls: ['./list-all-applications.component.css']
})
export class ListAllApplicationsComponent implements OnInit {
  displayProgressSpinner = false;
  dataSource;

  displayedColumns: string[] = ['application_Date', 'parentName', 'childName', 'childDateOfBirth', 'childSpecialNeeds', 'applicationStatus', 'actions'];

  applications: Application[] = [];
  application: Application;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _applicationsService: ApplicationsService,
    private _snackBar: MatSnackBar,

  ) {
  }

  ngOnInit(): void {
    this._getApplicationFromServer();
  }

  onAccept(application: Application) {
    this._applicationsService.accept(application.application_ID)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            this.displayProgressSpinner = false;
            this._getApplicationFromServer();
            this._openSnackBar("Application accepted", "Success", 3000);
          }
        },
        error: (error) => {
          this.displayProgressSpinner = false;
          this._openSnackBar(error.error.message, "Error", 3000);

        },
        complete: () => {
          this.displayProgressSpinner = false;
        }
      });
  }

  onReject(application: Application) {
    this._applicationsService.rejected(application.application_ID)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            this._getApplicationFromServer();
            this.displayProgressSpinner = false;
            this._openSnackBar("Application rejected", "Success", 3000);
          }
        },
        error: (error) => {
          this.displayProgressSpinner = false;
          this._openSnackBar(error.error.message, "Error", 3000);
        },
        complete: () => {
          this.displayProgressSpinner = false;
        }
      });
  }

  onViewApplicationDetails(application: Application) {
    let dialog = this._dialog.open(ViewApplicationDetailsComponent, {
      width: '100%',
      data: {
        application: application
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  private _getApplicationFromServer() {
    this._applicationsService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Application[];
            this.applications = res;
            this.dataSource = new MatTableDataSource<Application>(this.applications);
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

  private _openSnackBar(message: string, action: string, _duration: number) {
    this._snackBar.open(message, action, {
      duration: _duration,
    });
  }


}


