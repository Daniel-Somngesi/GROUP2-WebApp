import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScheduleService } from 'src/app/services/schedules/schedule.service';

@Component({
  selector: 'app-add-new-academic-year',
  templateUrl: './add-new-academic-year.component.html',
  styleUrls: ['./add-new-academic-year.component.css']
})
export class AddNewAcademicYearComponent implements OnInit {
  displayProgressSpinner = false;

  form: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddNewAcademicYearComponent>,
    private _snackBar: MatSnackBar,
    private _scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this._buildForm(this._formBuilder);
  }
  onSubmit() {
    if (this.form.invalid) {
      this.openSnackBar("Provide all required input", "Error");
    }
    else {
      this._scheduleService.create(this.form.value)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Add", "Success");
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
      AcademicYear: ['', [Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
    });
  }

  get AcademicYear() { return this.form.get('AcademicYear'); }
  get StartDate() { return this.form.get('StartDate'); }
  get EndDate() { return this.form.get('EndDate'); }
}
