import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Parent } from 'src/app/helpers/types/parent.types';
import { Child } from 'src/app/Interface/child.types';
import { ChildService } from 'src/app/services/child/child.service';

@Component({
  selector: 'app-list-all-children',
  templateUrl: './list-all-children.component.html',
  styleUrls: ['./list-all-children.component.css']
})
export class ListAllChildrenComponent implements OnInit {
  displayProgressSpinner = false;
  dataSource;

  displayedColumns: string[] = ['gender', 'name', 'surname','dateOfBirth', 'actions'];

  children: Child[] = [];
  child: Child;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _childService: ChildService,
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

  onViewDetails(child: Child) {
    this._router.navigate(['parent-details', child.parentEmailAddress]);
  }

  private _getDataFromServer() {
    this._childService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Child[];
            this.children = res;
            this.dataSource = new MatTableDataSource<Child>(this.children);
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

