import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AttendanceLog } from 'src/app/helpers/types/attendance-log.types';
import { User } from 'src/app/models';
import { AttendanceLogService } from 'src/app/services/attendance-log/attendance-log.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-all-users',
  templateUrl: './list-all-users.component.html',
  styleUrls: ['./list-all-users.component.css']
})
export class ListAllUsersComponent implements OnInit {
  displayProgressSpinner = false;
  dataSource;

  displayedColumns: string[] = ['username', 'role'];

  users: User[] = [];
  user: User;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _usersService: UserService

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
    this._usersService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as User[];
            this.users = res;
            this.dataSource = new MatTableDataSource<User>(this.users);
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


