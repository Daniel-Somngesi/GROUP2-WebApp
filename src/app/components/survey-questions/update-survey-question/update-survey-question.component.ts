import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SurveyQuestion, SurveyQuestionAnswerOption } from 'src/app/Interface/survey.types';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-update-survey-question',
  templateUrl: './update-survey-question.component.html',
  styleUrls: ['./update-survey-question.component.css']
})
export class UpdateSurveyQuestionComponent implements OnInit {
  displayProgressSpinner = false;
  form: FormGroup;

  record: SurveyQuestion;
  questionsPayload: string[] = [];

  @ViewChild('answerInput') answerInput: ElementRef;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateSurveyQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _surveyService: SurveyService) {
    this.record = dataFromParent.record as SurveyQuestion;

    this.record.answerOptions.forEach(o => {
      this.questionsPayload.push(o.text);
    });
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

    if (this.questionsPayload.length < 2) {
      this.openSnackBar("Question should have atleast 2 possible answers", "Error");
      isValid = false;
    }

    if (isValid) {
      let payload = {};
      payload['Index'] = this.record.index;
      payload['Title'] = this.Name.value;
      payload['PossibleAnswers'] = this.questionsPayload;


      this._surveyService.updateSurveyQuestion(this.record.id, payload)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Update Survey Question", "Success");
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

  addAnswerToPossibleAnswers(answerText: string) {
    if (answerText.length == 0) {
      this.openSnackBar("answer text is required", "Error");
    }
    else {
      const lower = this.questionsPayload.map(element => {
        return element.toLowerCase();
      });

      if (lower.includes(answerText.toLowerCase())) {
        this.openSnackBar("Answer already added to list", "Info");
      }
      else {
        this.questionsPayload.push(answerText);
        this.answerInput.nativeElement.value = "";
      }
    }
  }

  onRemoveAnswerFromList(answer: string) {
    // let record = this.record.answerOptions.find(o=>o.text.toLowerCase() == answer.toLowerCase());
    let index = this.questionsPayload.indexOf(answer);
    if (index > -1) {
      this.questionsPayload.splice(index, 1);
      this.openSnackBar("Answer removed from list", "Info");
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
        Name: [this.record.text, [Validators.required]]
      });

      this.SurveyName.disable();
    }
    else {
      this.openSnackBar("Could not initialise component", "Error");
    }

  }

  get SurveyName() { return this.form.get('SurveyName'); }
  get Name() { return this.form.get('Name'); }

}
