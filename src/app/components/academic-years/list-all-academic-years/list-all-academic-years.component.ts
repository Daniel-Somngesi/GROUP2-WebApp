import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Schedule } from 'src/app/helpers/types/schedule.types';
import { ApplicationsService } from 'src/app/services/applications/applications.service';
import { ScheduleService } from 'src/app/services/schedules/schedule.service';
import { AddNewAcademicYearComponent } from '../add-new-academic-year/add-new-academic-year.component';

@Component({
  selector: 'app-list-all-academic-years',
  templateUrl: './list-all-academic-years.component.html',
  styleUrls: ['./list-all-academic-years.component.css']
})
export class ListAllAcademicYearsComponent implements OnInit {
  displayProgressSpinner = false;
  dataSource;

  displayedColumns: string[] = ['academicYear', 'startDate', 'endDate','eventsCount','slotsCount', 'actions'];

  schedules: Schedule[] = [];
  schedule: Schedule;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _scheduleService: ScheduleService,
    private _snackBar: MatSnackBar,
    private _matDialog: MatDialog,
    private _router: Router

  ) {
  }

  ngOnInit(): void {
    this._getDataFromServer();
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

  onAdd() {
    let dialogRef = this._matDialog.open(AddNewAcademicYearComponent, {
      width: "900px",
      height: "auto"
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    })
  }

  private _getDataFromServer() {
    this._scheduleService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Schedule[];
            this.schedules = res;
            this.dataSource = new MatTableDataSource<Schedule>(this.schedules);
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


  onNavigateToSchedule(schedule: Schedule) {
    this._router.navigate(['schedule', schedule.academicYear])
  }
}


