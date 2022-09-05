import { HttpEventType } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Survey } from "src/app/Interface/survey.types";
import { SurveyService } from "src/app/services/survey/survey.service";
import { CustomErrorSnackBarComponent } from "src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component";


@Component({
  selector: 'app-edit-survey-dialog',
  templateUrl: './edit-survey-dialog.component.html',
  styleUrls: ['./edit-survey-dialog.component.css']
})
export class EditSurveyDialogComponent implements OnInit {
  displayProgressSpinner = false;
  form: FormGroup;

  record: Survey;
  minDate: any = new Date().toISOString().slice(0, 10);

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditSurveyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _surveyService: SurveyService) {
    this.record = dataFromParent.record as Survey;
  }

  ngOnInit(): void {
    this._buildForm(this._formBuilder);
  }

  onSubmit() {
    let isValid = true;
    if (this.form.invalid) {
      this.openSnackBar("Provide all required input", "Error");
      isValid = false;
    }

    if (this.EndDate.value <= this.StartDate.value) {
      this.openSnackBar("End date must be ahead of start date", "Error");
      isValid = false;
    }

    if (isValid) {
      this._surveyService.update(this.record.id, this.form.value)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Update Survey", "Success");
              this.closeDialog();
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

  private _buildForm(formFb: FormBuilder) {
    if (this.record != null) {
      this.form = formFb.group({
        Name: [this.record.name, [Validators.required]],
        StartDate: [this.record.rawStartDate, [Validators.required]],
        EndDate: [this.record.rawEndDate, [Validators.required]],
      });
    }
    else {
      this.openSnackBar("Could not initialise component", "Error");
    }

  }

  get Name() { return this.form.get('Name'); }
  get StartDate() { return this.form.get('StartDate'); }
  get EndDate() { return this.form.get('EndDate'); }
}
