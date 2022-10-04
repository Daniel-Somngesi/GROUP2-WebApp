import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Schedule } from 'src/app/helpers/types/schedule.types';
import { ScheduleService } from 'src/app/services/schedules/schedule.service';

@Component({
  selector: 'app-update-academic-year',
  templateUrl: './update-academic-year.component.html',
  styleUrls: ['./update-academic-year.component.css']
})
export class UpdateAcademicYearComponent implements OnInit {
  displayProgressSpinner = false;

  form: FormGroup;
  record: Schedule;
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateAcademicYearComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _snackBar: MatSnackBar,
    private _scheduleService: ScheduleService) {
    this.record = dataFromParent.record as Schedule;
  }

  ngOnInit(): void {
    this._buildForm(this._formBuilder);
  }
  onSubmit() {
    let isValid = true;
    if (this.form.invalid) {
      this.openSnackBar("Provide all required input", "Error");
      isValid = false;
      return;
    }

    if (this.EndDate.value <= this.StartDate.value) {
      this.openSnackBar("End date cannot be lower than start date", "Error");
      isValid = false;
      return;
    }
    if (isValid) {
      this._scheduleService.update(this.record.id, this.form.value)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Update Academic Year", "Success");
              this.closeDialog();
            }
          },
          error: (error) => {
            this.displayProgressSpinner = false;
            this.openSnackBar(error.error.message, "Error");

          },
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

  private _buildForm(formFb: FormBuilder) {
    this.form = formFb.group({
      AcademicYear: [this.record.academicYear, [Validators.required]],
      StartDate: [this.record.rawStartDate, [Validators.required]],
      EndDate: [this.record.rawEndDate, [Validators.required]],
    });
  }

  get AcademicYear() { return this.form.get('AcademicYear'); }
  get StartDate() { return this.form.get('StartDate'); }
  get EndDate() { return this.form.get('EndDate'); }
}
