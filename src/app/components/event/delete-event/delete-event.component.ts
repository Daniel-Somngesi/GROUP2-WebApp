import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScheduleEvent } from 'src/app/Interface/event.types';
import { EventService } from 'src/app/services/event.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent implements OnInit {
  displayProgressSpinner = false;
  record: ScheduleEvent;
  constructor(
    public dialogRef: MatDialogRef<DeleteEventComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _matSnackBar: MatSnackBar,
    private _eventService: EventService
  ) {
    this.record = dataFromParent.record as ScheduleEvent;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this._eventService.delete(this.record.id)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            this.displayProgressSpinner = false;

            this.openSnackBar("Delete Event", "Success");
            this.closeDialog();
          }
        },
        error: (error) => {
          window.location.reload()
          this.displayProgressSpinner = false;
          this._openErrorMessageSnackBar(error.error.message);
        },
        complete: () => {
          window.location.reload()
          this.displayProgressSpinner = false;
        }
      });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
    window.location.reload()
  }

  openSnackBar(message: string, action: string) {
    this._matSnackBar.open(message, action, {
      duration: 3000,
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
