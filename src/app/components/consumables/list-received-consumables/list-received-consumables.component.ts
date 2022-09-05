import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessRule } from 'src/app/Interface/business-rules.types';
import { ReceivedConsumable } from 'src/app/Interface/consumable.types';
import { ConsumablesService } from 'src/app/services/consumables/consumables.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-list-received-consumables',
  templateUrl: './list-received-consumables.component.html',
  styleUrls: ['./list-received-consumables.component.css']
})
export class ListReceivedConsumablesComponent implements OnInit {
  displayProgressSpinner = false;
  dataSource;

  displayedColumns: string[] = ['className', 'childName','consumableName', 'requestedQuantity','receivedQuantity'];

  consumables: ReceivedConsumable[] = [];
  rule: BusinessRule;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _matSnackBar: MatSnackBar,
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
    this._consumablesService.getAllReceivedConsumables()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as ReceivedConsumable[];
            this.consumables= res;
            this.dataSource = new MatTableDataSource<ReceivedConsumable>(this.consumables);
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


