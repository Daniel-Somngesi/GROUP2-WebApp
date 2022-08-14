import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SlotTime } from 'src/app/Interface/slot.types';
import { SlotService } from 'src/app/services/slots/slot.service';

@Component({
  selector: 'app-list-slots',
  templateUrl: './list-slots.component.html',
  styleUrls: ['./list-slots.component.css']
})
export class ListSlotsComponent implements OnInit {
  displayProgressSpinner = false;
  dataSource;

  displayedColumns: string[] = ['name', 'slotDay', 'slotStartTime', 'slotEndTime', 'actions'];

  slots: SlotTime[] = [];
  slot: SlotTime;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _slotService: SlotService,
    private _snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this._getSlotsFromServer();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _getSlotsFromServer() {
    this._slotService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as SlotTime[];
            this.slots = res;
            this.dataSource = new MatTableDataSource<SlotTime>(this.slots);
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

  onDelete(slot: SlotTime) {
    if (slot.name == 'Taken Slot') {
      this.openSnackBar("Cannot delete a slot that's taken", 'Error')
    }
    else {
      this._slotService.deleteSlot(slot.slotId);
      window.location.reload();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
