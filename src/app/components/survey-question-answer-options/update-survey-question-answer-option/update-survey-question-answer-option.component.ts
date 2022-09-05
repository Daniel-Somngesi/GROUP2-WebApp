import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SurveyQuestion, SurveyQuestionAnswerOption } from 'src/app/Interface/survey.types';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { UpdateSurveyQuestionComponent } from '../../survey-questions/update-survey-question/update-survey-question.component';

@Component({
  selector: 'app-update-survey-question-answer-option',
  templateUrl: './update-survey-question-answer-option.component.html',
  styleUrls: ['./update-survey-question-answer-option.component.css']
})
export class UpdateSurveyQuestionAnswerOptionComponent implements OnInit {
  displayProgressSpinner = false;
  form: FormGroup;

  record: SurveyQuestionAnswerOption;
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateSurveyQuestionAnswerOptionComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _surveyService: SurveyService) {
    this.record = dataFromParent.record as SurveyQuestionAnswerOption;
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

    if (isValid) {
      let payload = {};

      payload['Text'] = this.Text.value;

      this._surveyService.updateSurveyQuestionAnswerOption(this.record.id, payload)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Update Survey Question Answer Option", "Success");
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
        SurveyName: [this.record.surveyName, [Validators.required]],
        SurveyQuestionTitle: [this.record.surveyQuestionTitle, [Validators.required]],
        Text: [this.record.text, [Validators.required]]
      });

      this.SurveyName.disable();
      this.SurveyQuestionTitle.disable();
    }
    else {
      this.openSnackBar("Could not initialise component", "Error");
    }

  }

  get SurveyName() { return this.form.get('SurveyName'); }
  get SurveyQuestionTitle() { return this.form.get('SurveyQuestionTitle'); }
  get Text() { return this.form.get('Text'); }

}
