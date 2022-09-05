
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { DeleteBusinessRuleComponent } from '../../business-rules/delete-business-rule/delete-business-rule.component';
import { UpdateBusinessRuleComponent } from '../../business-rules/update-business-rule/update-business-rule.component';
import { ConsumablesService } from 'src/app/services/consumables/consumables.service';
import { Consumable } from 'src/app/Interface/consumable.types';
import { AddConsumablesDialogComponent } from '../add-consumables-dialog/add-consumables-dialog.component';
import { EditConsumablesDialogComponent } from '../edit-consumables-dialog/edit-consumables-dialog.component';
import { DeleteConsumablesDialogComponent } from '../delete-consumables-dialog/delete-consumables-dialog.component';

@Component({
  selector: 'app-consumables-list',
  templateUrl: './consumables-list.component.html',
  styleUrls: ['./consumables-list.component.css']
})
export class ConsumablesListComponent implements OnInit {
  displayProgressSpinner = false;
  dataSource;

  displayedColumns: string[] = ['name', 'actions'];

  consumables: Consumable[] = [];
  consumable: Consumable;

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

  onAdd() {
    let dialogRef = this._matDialog.open(AddConsumablesDialogComponent, {
      width: "900px",
      height: "auto"
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    })
  }

  onUpdateValue(value: Consumable) {
    let dialogRef = this._matDialog.open(EditConsumablesDialogComponent, {
      width: "80%",
      height: "auto",
      data: {
        record: value
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    });
  }

  onDeleteValue(value: Consumable) {
    let dialogRef = this._matDialog.open(DeleteConsumablesDialogComponent, {
      width: "80%",
      height: "auto",
      data: {
        record: value
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    });
  }

  private _getDataFromServer() {
    this._consumablesService.getAllConsumables()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Consumable[];
            this.consumables = res;
            this.dataSource = new MatTableDataSource<Consumable>(this.consumables);
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


