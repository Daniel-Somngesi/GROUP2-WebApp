import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessRule } from 'src/app/Interface/business-rules.types';
import { RequestedConsumable } from 'src/app/Interface/consumable.types';
import { ConsumablesService } from 'src/app/services/consumables/consumables.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-list-requested-consumables',
  templateUrl: './list-requested-consumables.component.html',
  styleUrls: ['./list-requested-consumables.component.css']
})
export class ListRequestedConsumablesComponent implements OnInit {
  displayProgressSpinner = false;
  dataSource;

  displayedColumns: string[] = ['className', 'childName','consumableName', 'quantity'];

  consumables: RequestedConsumable[] = [];
  rule: BusinessRule;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _matDialog: MatDialog,
    private _consumablesService: ConsumablesService
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
    this._consumablesService.getAllRequestedConsumables()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as RequestedConsumable[];
            this.consumables= res;
            this.dataSource = new MatTableDataSource<RequestedConsumable>(this.consumables);
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


