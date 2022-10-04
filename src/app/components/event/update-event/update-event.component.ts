import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScheduleEvent } from 'src/app/Interface/event.types';
import { EventService } from 'src/app/services/event.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  displayProgressSpinner = false;
  record: ScheduleEvent;
  activityFormGroup: FormGroup;

  start: Date = new Date();
  end: Date = new Date();
  minDate: any = new Date().toISOString().slice(0, 10);

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateEventComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _eventService: EventService,
  ) {
    this.record = dataFromParent.record as ScheduleEvent;
  }

  ngOnInit(): void {
    this._buildForm();
  }

  onSubmit() {
    let payload: any = {};
    payload['Title'] = this.Title.value;
    payload['Start'] = this.start;
    payload['End'] = this.end;

    let valid = true;

    if (JSON.stringify(this.end) <= JSON.stringify(this.start)) {
      this.openSnackBar("To date time should be greater than From date time", "Error");
      valid = false;
    }

    if (valid) {

      this._eventService.update(this.record.id, payload)
        .subscribe({
          next: (event => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }

            if (event.type === HttpEventType.Response) {
              this.openSnackBar("Update Event", "Success");
              this.displayProgressSpinner = false;
              // window.location.reload();
              this.closeDialog();
            }
          }),
          error: (error => {
            this.displayProgressSpinner = false;
            this._openErrorMessageSnackBar(error.error.message);
          }),
          complete: () => {
            this.displayProgressSpinner = false;
          }
        });
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
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

  private _buildForm() {
    this.activityFormGroup = this._formBuilder.group({
      Title: [this.record.name, [Validators.required]],
      start: [null, [Validators.required]],
      end: [null, [Validators.required]],
    });
    this.start = this.record.start as any;
    this.end = this.record.end as any;
  }

  get Title() { return this.activityFormGroup.get('Title'); }


}
