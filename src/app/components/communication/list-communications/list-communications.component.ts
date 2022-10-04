import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/helpers/types/auth.types';
import { Blog } from 'src/app/Interface/blog.types';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { BlogService } from 'src/app/services/blog/blog.service';
import { CommunicationsService } from 'src/app/services/communications/communications.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { DeleteBlockComponent } from '../../blog/delete-block/delete-block.component';
import { AddCommunicationComponent } from '../add-communication/add-communication.component';
import { DeleteCommunicationComponent } from '../delete-communication/delete-communication.component';
import { ViewComuunicationComponent } from '../view-comuunication/view-comuunication.component';

@Component({
  selector: 'app-list-communications',
  templateUrl: './list-communications.component.html',
  styleUrls: ['./list-communications.component.css']
})
export class ListCommunicationsComponent implements OnInit {
  displayProgressSpinner = false;
  dataSource;

  displayedColumns: string[] = ['date', 'title', 'employeeUsername', 'actions'];

  blogs: Blog[] = [];
  blog: Blog;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _matDialog: MatDialog,
    private _communicationsService: CommunicationsService,
    private _authService: AuthService,
  ) {
    this._setUser();
  }

  ngOnInit(): void {
    this._getDataFromServer();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onView(value: Blog) {
    let dialogRef = this._matDialog.open(ViewComuunicationComponent, {
      width: "900px",
      height: "auto",
      data: {
        record: value
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    })
  }

  onAdd() {
    let dialogRef = this._matDialog.open(AddCommunicationComponent, {
      width: "900px",
      height: "auto"
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    })
  }

  onDeleteValue(value: Blog) {
    let dialogRef = this._matDialog.open(DeleteCommunicationComponent, {
      data: {
        record: value
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    });
  }

  private _getDataFromServer() {
    this.displayProgressSpinner = false;
    this._communicationsService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Blog[];
            this.blogs = res;
            this.dataSource = new MatTableDataSource<Blog>(this.blogs);
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

  user: CurrentUser;
  private _setUser() {
    if (this._authService.currentUser != null) {
      this.user = this._authService.currentUser;
    }
  }

  get isAdmin() {
    if (this._authService.currentUser != null) {
      if (this.user.EmployeeType == 'Admin' || this.user.UserRole == 'administrator') {
        return true;
      }
      else {
        return false;
      }
    }
    return false;
  }

}

