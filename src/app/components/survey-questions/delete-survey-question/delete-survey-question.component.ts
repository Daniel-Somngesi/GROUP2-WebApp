import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SurveyQuestion } from 'src/app/Interface/survey.types';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-delete-survey-question',
  templateUrl: './delete-survey-question.component.html',
  styleUrls: ['./delete-survey-question.component.css']
})
export class DeleteSurveyQuestionComponent implements OnInit {
  displayProgressSpinner = false;

  record: SurveyQuestion;

  constructor(
    public dialogRef: MatDialogRef<DeleteSurveyQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _matSnackBar: MatSnackBar,
    private _surveyService: SurveyService) {
    this.record = dataFromParent.record as SurveyQuestion;
  }

  ngOnInit(): void {
  }

  onSubmit() {

    this._surveyService.deleteSurveyQuestion(this.record.id)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            this.displayProgressSpinner = false;

            this.openSnackBar("Delete Survey Question", "Success");
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

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
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
