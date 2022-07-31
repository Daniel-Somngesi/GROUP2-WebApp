import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Parent } from 'src/app/helpers/types/parent.types';
import { ParentService } from 'src/app/services/parent/parent.service';
import { ViewParentChildDetailsComponent } from '../view-parent-child-details/view-parent-child-details.component';

@Component({
  selector: 'app-list-all-parents',
  templateUrl: './list-all-parents.component.html',
  styleUrls: ['./list-all-parents.component.css']
})
export class ListAllParentsComponent implements OnInit {
  displayProgressSpinner = false;
  dataSource;

  displayedColumns: string[] = ['title', 'name', 'surname', 'email', 'contactNumber', 'actions'];

  parents: Parent[] = [];
  parent: Parent;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _parentService: ParentService,
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

  onViewDetails(parent: Parent) {
    this._router.navigate(['parent-details', parent.email]);
  }

  private _getDataFromServer() {
    this._parentService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Parent[];
            this.parents = res;
            this.dataSource = new MatTableDataSource<Parent>(this.parents);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.displayProgressSpinner = false;
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

  private _openSnackBar(message: string, action: string, _duration: number) {
    this._snackBar.open(message, action, {
      duration: _duration,
    });
  }


}

