import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Schedule } from 'src/app/helpers/types/schedule.types';
import { ScheduleService } from 'src/app/services/schedules/schedule.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { DeleteActivityComponent } from '../../activities/delete-activity/delete-activity.component';

@Component({
  selector: 'app-delete-academic-year',
  templateUrl: './delete-academic-year.component.html',
  styleUrls: ['./delete-academic-year.component.css']
})
export class DeleteAcademicYearComponent implements OnInit {
  displayProgressSpinner = false;
  record: Schedule;
  constructor(
    public dialogRef: MatDialogRef<DeleteActivityComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _matSnackBar: MatSnackBar,
    private _scheduleService: ScheduleService
  ) {
    this.record = dataFromParent.record as Schedule;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this._scheduleService.delete(this.record.id)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            this.displayProgressSpinner = false;

            this.openSnackBar("Delete Academic Year", "Success");
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
